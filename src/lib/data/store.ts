import { Project, Developer, SubmissionPayload, SubmissionStatus } from '../types';
import {
  dbGetApprovedProjects,
  dbGetProjectBySlug,
  dbGetProjectsByCreator,
  dbGetAllProjectsAdmin,
  dbInsertProject,
  dbReviewProject,
  dbUpdateProject,
  dbDeleteProject,
  dbGetAllDevelopers,
  dbGetDeveloperByUsername,
  dbUpsertDeveloper,
  dbGetProjectsBySubmissionStatus,
  dbGetAdminStats,
} from '../db';

/**
 * Public discovery methods: Strictly approved projects from PostgreSQL!
 */
export async function getApprovedProjects(): Promise<Project[]> {
  try {
    const dbProjects = await dbGetApprovedProjects();
    return (dbProjects || []).map(sanitizeProjectForPublic);
  } catch (err) {
    console.error('PostgreSQL getApprovedProjects error:', err);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const dbProject = await dbGetProjectBySlug(slug);
    if (!dbProject) return undefined;
    if (dbProject.submissionStatus !== 'APPROVED') return undefined;
    return sanitizeProjectForPublic(dbProject);
  } catch (err) {
    console.error(`PostgreSQL getProjectBySlug('${slug}') error:`, err);
    return undefined;
  }
}

export async function getProjectsByCreator(username: string): Promise<Project[]> {
  try {
    const dbProjects = await dbGetProjectsByCreator(username);
    return (dbProjects || []).map(sanitizeProjectForPublic);
  } catch (err) {
    console.error(`PostgreSQL getProjectsByCreator('${username}') error:`, err);
    return [];
  }
}

/**
 * Developer directory methods: Live data from PostgreSQL!
 */
export async function getDevelopers(): Promise<Developer[]> {
  try {
    const dbDevs = await dbGetAllDevelopers();
    return (dbDevs || []).map(sanitizeDeveloperForPublic);
  } catch (err) {
    console.error('PostgreSQL getDevelopers error:', err);
    return [];
  }
}

export async function getDeveloperByUsername(username: string): Promise<Developer | undefined> {
  try {
    const dbDev = await dbGetDeveloperByUsername(username);
    return dbDev ? sanitizeDeveloperForPublic(dbDev) : undefined;
  } catch (err) {
    console.error(`PostgreSQL getDeveloperByUsername('${username}') error:`, err);
    return undefined;
  }
}

/**
 * Privacy controls: Remove private emails & raw contact info unless opted in
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
 * Admin / Moderation methods: Direct PostgreSQL execution
 */
export async function getAllProjectsAdmin(): Promise<Project[]> {
  try {
    return await dbGetAllProjectsAdmin();
  } catch (err) {
    console.error('PostgreSQL getAllProjectsAdmin error:', err);
    return [];
  }
}

export async function reviewProjectSubmission(
  id: string,
  decision: 'APPROVED' | 'DECLINED',
  adminNotes?: string,
  adminId?: string
): Promise<Project | null> {
  try {
    return await dbReviewProject(id, decision as SubmissionStatus, adminNotes, adminId);
  } catch (err) {
    console.error(`PostgreSQL reviewProjectSubmission('${id}', '${decision}') error:`, err);
    throw err;
  }
}

export async function updateProjectAdmin(
  id: string,
  updates: Partial<Project>
): Promise<Project | null> {
  try {
    return await dbUpdateProject(id, updates);
  } catch (err) {
    console.error(`PostgreSQL updateProjectAdmin('${id}') error:`, err);
    throw err;
  }
}

export async function deleteProjectAdmin(id: string): Promise<Project | null> {
  try {
    return await dbDeleteProject(id);
  } catch (err) {
    console.error(`PostgreSQL deleteProjectAdmin('${id}') error:`, err);
    throw err;
  }
}

export async function getProjectsByStatus(status: SubmissionStatus): Promise<Project[]> {
  try {
    return await dbGetProjectsBySubmissionStatus(status);
  } catch (err) {
    console.error(`PostgreSQL getProjectsByStatus('${status}') error:`, err);
    return [];
  }
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
    console.error('PostgreSQL getAdminStats error:', err);
    return {
      pendingCount: 0,
      approvedCount: 0,
      declinedCount: 0,
      totalProjects: 0,
      totalDevelopers: 0,
    };
  }
}

export async function getAllDevelopersAdmin(): Promise<Developer[]> {
  try {
    return await dbGetAllDevelopers();
  } catch (err) {
    console.error('PostgreSQL getAllDevelopersAdmin error:', err);
    return [];
  }
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
    creatorAvatar: payload.creatorAvatarUrl?.trim() || undefined,
    creatorEmail: payload.creatorEmail.trim(), // stored safely in private database
    creatorWhatsApp: payload.creatorWhatsApp?.trim() || undefined,
    allowWhatsAppContact: Boolean(payload.allowWhatsAppContact),
    creatorLinkedIn: payload.creatorLinkedIn?.trim() || undefined,
    creatorWebsite: payload.creatorWebsite?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  // Insert into PostgreSQL
  await dbInsertProject(newProject);

  // Auto-register developer if not existing
  const newDev: Developer = {
    id: `dev-${username}`,
    username,
    name: payload.creatorName.trim(),
    role: 'Project Creator',
    bio: `Creator of ${payload.projectTitle.trim()}. Building on the open web.`,
    avatarUrl: payload.creatorAvatarUrl?.trim() || undefined,
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
    console.error('PostgreSQL dbUpsertDeveloper error during submit:', err);
  }

  return { success: true, project: newProject };
}
