import fs from 'fs';
import path from 'path';
import { Project, Developer, SubmissionPayload, SubmissionStatus } from '../types';
import { INITIAL_PROJECTS, INITIAL_DEVELOPERS } from './demoData';
import {
  dbGetApprovedProjects,
  dbGetProjectBySlug,
  dbGetProjectsByCreator,
  dbGetAllProjectsAdmin,
  dbInsertProject,
  dbReviewProject,
  dbGetAllDevelopers,
  dbGetDeveloperByUsername,
  dbUpsertDeveloper,
  dbGetProjectsBySubmissionStatus,
  dbGetAdminStats,
} from '../db';

// File-based persistence storage path (acts as cache & offline fallback)
const DATA_DIR = path.join(process.cwd(), '.cardex_data');
const DATA_FILE = path.join(DATA_DIR, 'projects.json');

function ensureDataFile(): Project[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_PROJECTS, null, 2), 'utf8');
      return INITIAL_PROJECTS;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_PROJECTS;
  } catch (err) {
    console.error('Error loading cardex data store:', err);
    return INITIAL_PROJECTS;
  }
}

function saveDataFile(projects: Project[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving cardex data store:', err);
  }
}

// In-memory cache synced with disk and PostgreSQL
let cachedProjects: Project[] = ensureDataFile();
let cachedDevelopers: Developer[] = [...INITIAL_DEVELOPERS];

/**
 * Public discovery methods: Strictly approved projects only!
 */
export async function getApprovedProjects(): Promise<Project[]> {
  try {
    const dbProjects = await dbGetApprovedProjects();
    if (dbProjects && dbProjects.length > 0) {
      cachedProjects = dbProjects;
      saveDataFile(cachedProjects);
      return dbProjects.map(sanitizeProjectForPublic);
    }
  } catch (err) {
    console.warn('PostgreSQL fetch fallback to local cache:', err);
  }

  return cachedProjects
    .filter((p) => p.submissionStatus === 'APPROVED')
    .map(sanitizeProjectForPublic);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const dbProject = await dbGetProjectBySlug(slug);
    if (dbProject) {
      if (dbProject.submissionStatus !== 'APPROVED') return undefined;
      return sanitizeProjectForPublic(dbProject);
    }
  } catch (err) {
    console.warn('PostgreSQL getProjectBySlug fallback to cache:', err);
  }

  const project = cachedProjects.find((p) => p.slug === slug);
  if (!project) return undefined;
  if (project.submissionStatus !== 'APPROVED') return undefined;
  return sanitizeProjectForPublic(project);
}

export async function getProjectsByCreator(username: string): Promise<Project[]> {
  try {
    const dbProjects = await dbGetProjectsByCreator(username);
    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.map(sanitizeProjectForPublic);
    }
  } catch (err) {
    console.warn('PostgreSQL getProjectsByCreator fallback to cache:', err);
  }

  return cachedProjects
    .filter((p) => p.creatorUsername === username && p.submissionStatus === 'APPROVED')
    .map(sanitizeProjectForPublic);
}

/**
 * Developer directory methods
 */
export async function getDevelopers(): Promise<Developer[]> {
  try {
    const dbDevs = await dbGetAllDevelopers();
    if (dbDevs && dbDevs.length > 0) {
      cachedDevelopers = dbDevs;
      return dbDevs.map(sanitizeDeveloperForPublic);
    }
  } catch (err) {
    console.warn('PostgreSQL getDevelopers fallback to cache:', err);
  }

  return cachedDevelopers.map(sanitizeDeveloperForPublic);
}

export async function getDeveloperByUsername(username: string): Promise<Developer | undefined> {
  try {
    const dbDev = await dbGetDeveloperByUsername(username);
    if (dbDev) {
      return sanitizeDeveloperForPublic(dbDev);
    }
  } catch (err) {
    console.warn('PostgreSQL getDeveloperByUsername fallback to cache:', err);
  }

  const dev = cachedDevelopers.find(
    (d) => d.username.toLowerCase() === username.toLowerCase()
  );
  return dev ? sanitizeDeveloperForPublic(dev) : undefined;
}

/**
 * Privacy controls: Remove private emails & raw phone numbers
 */
function sanitizeProjectForPublic(project: Project): Project {
  return {
    ...project,
    creatorEmail: '', // strictly stripped from public response
    creatorWhatsApp: project.allowWhatsAppContact ? project.creatorWhatsApp : undefined,
  };
}

function sanitizeDeveloperForPublic(dev: Developer): Developer {
  return {
    ...dev,
    whatsApp: dev.allowWhatsAppContact ? dev.whatsApp : undefined,
  };
}

/**
 * Admin / Moderation methods
 */
export async function getAllProjectsAdmin(): Promise<Project[]> {
  try {
    const dbProjects = await dbGetAllProjectsAdmin();
    if (dbProjects && dbProjects.length > 0) {
      cachedProjects = dbProjects;
      saveDataFile(cachedProjects);
      return dbProjects;
    }
  } catch (err) {
    console.warn('PostgreSQL getAllProjectsAdmin fallback to cache:', err);
  }

  return [...cachedProjects];
}

export async function reviewProjectSubmission(
  id: string,
  decision: 'APPROVED' | 'DECLINED',
  adminNotes?: string,
  adminId?: string
): Promise<Project | null> {
  try {
    const updated = await dbReviewProject(id, decision as SubmissionStatus, adminNotes, adminId);
    if (updated) {
      const idx = cachedProjects.findIndex((p) => p.id === id);
      if (idx !== -1) {
        cachedProjects[idx] = updated;
      } else {
        cachedProjects.unshift(updated);
      }
      saveDataFile(cachedProjects);
      return updated;
    }
  } catch (err) {
    console.error('PostgreSQL reviewProjectSubmission error:', err);
  }

  // Local fallback
  const index = cachedProjects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  cachedProjects[index] = {
    ...cachedProjects[index],
    submissionStatus: decision,
    adminNotes: adminNotes || cachedProjects[index].adminNotes,
    reviewedAt: now,
    reviewedById: adminId,
    updatedAt: now,
  };

  saveDataFile(cachedProjects);
  return cachedProjects[index];
}

export async function getProjectsByStatus(status: SubmissionStatus): Promise<Project[]> {
  try {
    const dbProjects = await dbGetProjectsBySubmissionStatus(status);
    if (dbProjects) {
      return dbProjects;
    }
  } catch (err) {
    console.warn('PostgreSQL getProjectsByStatus fallback to cache:', err);
  }

  return cachedProjects.filter((p) => p.submissionStatus === status);
}

export async function getAdminStats(): Promise<{
  pendingCount: number;
  approvedCount: number;
  declinedCount: number;
  totalProjects: number;
  totalDevelopers: number;
}> {
  try {
    return await dbGetAdminStats();
  } catch (err) {
    console.warn('PostgreSQL getAdminStats fallback to cache calculation:', err);
    const pendingCount = cachedProjects.filter((p) => p.submissionStatus === 'PENDING').length;
    const approvedCount = cachedProjects.filter((p) => p.submissionStatus === 'APPROVED').length;
    const declinedCount = cachedProjects.filter((p) => p.submissionStatus === 'DECLINED').length;
    return {
      pendingCount,
      approvedCount,
      declinedCount,
      totalProjects: cachedProjects.length,
      totalDevelopers: cachedDevelopers.length,
    };
  }
}

export async function getAllDevelopersAdmin(): Promise<Developer[]> {
  try {
    const dbDevs = await dbGetAllDevelopers();
    if (dbDevs && dbDevs.length > 0) {
      return dbDevs;
    }
  } catch (err) {
    console.warn('PostgreSQL getAllDevelopersAdmin fallback to cache:', err);
  }
  return [...cachedDevelopers];
}

/**
 * Public submission: Enters as PENDING REVIEW directly into PostgreSQL
 */
export async function submitProject(payload: SubmissionPayload): Promise<{
  success: boolean;
  project?: Project;
  error?: string;
}> {
  // Validate required fields server-side
  if (!payload.creatorName?.trim()) return { success: false, error: 'Creator name is required.' };
  if (!payload.creatorEmail?.trim() || !payload.creatorEmail.includes('@')) {
    return { success: false, error: 'Valid creator email is required.' };
  }
  if (!payload.projectTitle?.trim()) return { success: false, error: 'Project title is required.' };
  if (!payload.projectDescription?.trim()) return { success: false, error: 'Project description is required.' };
  if (!payload.category?.trim()) return { success: false, error: 'Category is required.' };
  if (!payload.technologies || payload.technologies.length === 0) {
    return { success: false, error: 'At least one technology is required.' };
  }

  // Generate URL slug
  const baseSlug = payload.projectTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  const timestamp = Date.now();
  const slug = `${baseSlug}-${timestamp.toString().slice(-4)}`;

  const now = new Date().toISOString();
  const username =
    payload.creatorName.toLowerCase().replace(/[^a-z0-9]/g, '') ||
    `creator${timestamp.toString().slice(-4)}`;

  const newProject: Project = {
    id: `proj-${timestamp}`,
    slug,
    title: payload.projectTitle.trim(),
    description: payload.projectDescription.trim(),
    category: payload.category.trim(),
    technologies: payload.technologies.map((t) => t.trim()).filter(Boolean),
    imageUrl: payload.imageUrl?.trim() || '/images/projects/adyk-cradez.jpg',
    githubUrl: payload.githubUrl?.trim() || undefined,
    liveDemoUrl: payload.liveDemoUrl?.trim() || undefined,
    demoVideoUrl: payload.demoVideoUrl?.trim() || undefined,
    problemSolved: payload.problemSolved?.trim() || undefined,
    howItWorks: payload.howItWorks?.trim() || undefined,
    status: payload.projectStatus || 'BUILDING',
    submissionStatus: 'PENDING', // CRITICAL: starts as PENDING!
    collaborationOpen: Boolean(payload.collaborationOpen),
    lookingFor: payload.collaborationOpen ? payload.lookingFor || [] : [],
    creatorName: payload.creatorName.trim(),
    creatorUsername: username,
    creatorRole: 'Creator / Builder',
    creatorEmail: payload.creatorEmail.trim(), // stored safely in private database
    creatorWhatsApp: payload.creatorWhatsApp?.trim() || undefined,
    allowWhatsAppContact: Boolean(payload.allowWhatsAppContact),
    creatorLinkedIn: payload.creatorLinkedIn?.trim() || undefined,
    creatorWebsite: payload.creatorWebsite?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  // Insert into PostgreSQL
  try {
    await dbInsertProject(newProject);
  } catch (err) {
    console.error('PostgreSQL dbInsertProject error:', err);
  }

  // Update in-memory & file cache
  cachedProjects.unshift(newProject);
  saveDataFile(cachedProjects);

  // Auto-register developer if not existing
  const newDev: Developer = {
    id: `dev-${username}`,
    username,
    name: payload.creatorName.trim(),
    role: 'Project Creator',
    bio: `Creator of ${payload.projectTitle.trim()}. Building on the open web.`,
    skills: payload.technologies,
    availability: payload.collaborationOpen ? 'OPEN FOR COLLABORATION' : 'OPEN TO CONNECT',
    collaborationPreference: 'Open to connecting with builders and creators on ADYK CARDEX.',
    featuredProjectSlugs: [slug],
    githubUrl: payload.githubUrl,
    linkedInUrl: payload.creatorLinkedIn,
    portfolioUrl: payload.creatorWebsite,
    whatsApp: payload.creatorWhatsApp,
    allowWhatsAppContact: Boolean(payload.allowWhatsAppContact),
    joinedAt: now.split('T')[0],
  };

  try {
    await dbUpsertDeveloper(newDev);
  } catch (err) {
    console.error('PostgreSQL dbUpsertDeveloper error:', err);
  }

  const existingDev = cachedDevelopers.find((d) => d.username === username);
  if (!existingDev) {
    cachedDevelopers.push(newDev);
  } else {
    existingDev.featuredProjectSlugs.push(slug);
  }

  return { success: true, project: newProject };
}
