import { Pool, QueryResultRow } from 'pg';
import { Project, Developer, SubmissionStatus, Admin, AdminRole } from '../types';
import { INITIAL_PROJECTS, INITIAL_DEVELOPERS } from '../data/demoData';

// Maintain a single pool instance across hot reloads in development
declare global {
  var __cardexPool: Pool | undefined;
}

function getConnectionString(): string {
  const raw =
    process.env.DATABASE_URL ||
    'postgresql://neondb_owner:npg_NvejApK02Wyt@ep-crimson-water-b57gv6za-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=verify-full';
  return raw.replace(/sslmode=(require|prefer|verify-ca)/g, 'sslmode=verify-full');
}

export function getPool(): Pool {
  if (!global.__cardexPool) {
    global.__cardexPool = new Pool({
      connectionString: getConnectionString(),
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 8000,
    });
  }
  return global.__cardexPool;
}

let dbInitialized = false;

/**
 * Initialize Neon PostgreSQL schema and seed baseline demo data if tables are empty
 */
export async function initDb(): Promise<void> {
  if (dbInitialized) return;

  const pool = getPool();
  try {
    // Create developers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS developers (
        id VARCHAR(120) PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(200) NOT NULL,
        role VARCHAR(200) NOT NULL,
        bio TEXT NOT NULL,
        avatar_url VARCHAR(500),
        skills TEXT[] NOT NULL DEFAULT '{}',
        availability VARCHAR(100) DEFAULT 'OPEN_TO_CONNECT',
        collaboration_preference TEXT,
        featured_project_slugs TEXT[] NOT NULL DEFAULT '{}',
        github_url VARCHAR(500),
        linkedin_url VARCHAR(500),
        portfolio_url VARCHAR(500),
        whatsapp VARCHAR(100),
        allow_whatsapp_contact BOOLEAN DEFAULT false,
        location VARCHAR(200),
        joined_at VARCHAR(100) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Create projects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(120) PRIMARY KEY,
        slug VARCHAR(200) UNIQUE NOT NULL,
        title VARCHAR(300) NOT NULL,
        tagline VARCHAR(500),
        description TEXT NOT NULL,
        category VARCHAR(200) NOT NULL,
        technologies TEXT[] NOT NULL DEFAULT '{}',
        image_url VARCHAR(500) NOT NULL,
        demo_video_url VARCHAR(500),
        github_url VARCHAR(500),
        live_demo_url VARCHAR(500),
        problem_solved TEXT,
        how_it_works TEXT,
        status VARCHAR(50) DEFAULT 'BUILDING',
        submission_status VARCHAR(50) DEFAULT 'PENDING',
        collaboration_open BOOLEAN DEFAULT false,
        looking_for TEXT[] NOT NULL DEFAULT '{}',
        creator_name VARCHAR(200) NOT NULL,
        creator_username VARCHAR(100) NOT NULL,
        creator_role VARCHAR(200) DEFAULT 'Creator / Builder',
        creator_avatar VARCHAR(500),
        creator_email VARCHAR(200) NOT NULL,
        creator_whatsapp VARCHAR(100),
        allow_whatsapp_contact BOOLEAN DEFAULT false,
        creator_linkedin VARCHAR(500),
        creator_github VARCHAR(500),
        creator_website VARCHAR(500),
        admin_notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        reviewed_at TIMESTAMPTZ,
        reviewed_by_id VARCHAR(120)
      );
    `);

    // Ensure reviewed_by_id column exists if table was already created
    await pool.query(`
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS reviewed_by_id VARCHAR(120);
    `);

    // Create admins table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id VARCHAR(120) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(500) NOT NULL,
        name VARCHAR(200) NOT NULL,
        role VARCHAR(50) DEFAULT 'ADMIN',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        last_login_at TIMESTAMPTZ
      );
      CREATE INDEX IF NOT EXISTS admins_email_idx ON admins(email);
    `);

    // Check if developers table has data, seed if empty
    const devCount = await pool.query('SELECT COUNT(*) as count FROM developers');
    if (parseInt(devCount.rows[0].count, 10) === 0) {
      for (const dev of INITIAL_DEVELOPERS) {
        await pool.query(
          `INSERT INTO developers (
            id, username, name, role, bio, avatar_url, skills,
            availability, collaboration_preference, featured_project_slugs,
            github_url, linkedin_url, portfolio_url, whatsapp,
            allow_whatsapp_contact, location, joined_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
          ON CONFLICT (username) DO NOTHING`,
          [
            dev.id,
            dev.username,
            dev.name,
            dev.role,
            dev.bio,
            dev.avatarUrl || null,
            dev.skills,
            dev.availability,
            dev.collaborationPreference,
            dev.featuredProjectSlugs,
            dev.githubUrl || null,
            dev.linkedInUrl || null,
            dev.portfolioUrl || null,
            dev.whatsApp || null,
            dev.allowWhatsAppContact,
            dev.location || null,
            dev.joinedAt,
          ]
        );
      }
    }

    // Check if projects table has data, seed if empty
    const projCount = await pool.query('SELECT COUNT(*) as count FROM projects');
    if (parseInt(projCount.rows[0].count, 10) === 0) {
      for (const p of INITIAL_PROJECTS) {
        await pool.query(
          `INSERT INTO projects (
            id, slug, title, tagline, description, category, technologies,
            image_url, demo_video_url, github_url, live_demo_url,
            problem_solved, how_it_works, status, submission_status,
            collaboration_open, looking_for, creator_name, creator_username,
            creator_role, creator_email, creator_whatsapp, allow_whatsapp_contact,
            creator_linkedin, creator_github, creator_website, admin_notes,
            created_at, updated_at, reviewed_at
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
            $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30
          )
          ON CONFLICT (slug) DO NOTHING`,
          [
            p.id,
            p.slug,
            p.title,
            p.tagline || null,
            p.description,
            p.category,
            p.technologies,
            p.imageUrl,
            p.demoVideoUrl || null,
            p.githubUrl || null,
            p.liveDemoUrl || null,
            p.problemSolved || null,
            p.howItWorks || null,
            p.status,
            p.submissionStatus,
            p.collaborationOpen,
            p.lookingFor,
            p.creatorName,
            p.creatorUsername,
            p.creatorRole,
            p.creatorEmail,
            p.creatorWhatsApp || null,
            p.allowWhatsAppContact,
            p.creatorLinkedIn || null,
            p.creatorGitHub || null,
            p.creatorWebsite || null,
            p.adminNotes || null,
            p.createdAt,
            p.updatedAt,
            p.reviewedAt || null,
          ]
        );
      }
    }

    dbInitialized = true;
  } catch (err) {
    console.error('Error during PostgreSQL database initialization:', err);
    throw err;
  }
}

/**
 * Helper to map DB row to Project object
 */
export function rowToProject(row: QueryResultRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline || undefined,
    description: row.description,
    category: row.category,
    technologies: Array.isArray(row.technologies) ? row.technologies : [],
    imageUrl: row.image_url,
    demoVideoUrl: row.demo_video_url || undefined,
    githubUrl: row.github_url || undefined,
    liveDemoUrl: row.live_demo_url || undefined,
    problemSolved: row.problem_solved || undefined,
    howItWorks: row.how_it_works || undefined,
    status: row.status,
    submissionStatus: row.submission_status,
    collaborationOpen: Boolean(row.collaboration_open),
    lookingFor: Array.isArray(row.looking_for) ? row.looking_for : [],
    creatorName: row.creator_name,
    creatorUsername: row.creator_username,
    creatorRole: row.creator_role || 'Creator / Builder',
    creatorAvatar: row.creator_avatar || undefined,
    creatorEmail: row.creator_email || '',
    creatorWhatsApp: row.creator_whatsapp || undefined,
    allowWhatsAppContact: Boolean(row.allow_whatsapp_contact),
    creatorLinkedIn: row.creator_linkedin || undefined,
    creatorGitHub: row.creator_github || undefined,
    creatorWebsite: row.creator_website || undefined,
    adminNotes: row.admin_notes || undefined,
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
    reviewedAt: row.reviewed_at ? new Date(row.reviewed_at).toISOString() : undefined,
    reviewedById: row.reviewed_by_id || undefined,
  };
}

/**
 * Helper to map DB row to Admin object
 */
export function rowToAdmin(row: QueryResultRow): Admin {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    name: row.name,
    role: (row.role || 'ADMIN') as AdminRole,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
    lastLoginAt: row.last_login_at ? new Date(row.last_login_at).toISOString() : undefined,
  };
}

/**
 * Helper to map DB row to Developer object
 */
export function rowToDeveloper(row: QueryResultRow): Developer {
  return {
    id: row.id,
    username: row.username,
    name: row.name,
    role: row.role,
    bio: row.bio,
    avatarUrl: row.avatar_url || undefined,
    skills: Array.isArray(row.skills) ? row.skills : [],
    availability: row.availability,
    collaborationPreference: row.collaboration_preference || '',
    featuredProjectSlugs: Array.isArray(row.featured_project_slugs) ? row.featured_project_slugs : [],
    githubUrl: row.github_url || undefined,
    linkedInUrl: row.linkedin_url || undefined,
    portfolioUrl: row.portfolio_url || undefined,
    whatsApp: row.whatsapp || undefined,
    allowWhatsAppContact: Boolean(row.allow_whatsapp_contact),
    location: row.location || undefined,
    joinedAt: row.joined_at || '2026-01-01',
  };
}

// -------------------------------------------------------------
// Database Operations
// -------------------------------------------------------------

export async function dbGetApprovedProjects(): Promise<Project[]> {
  await initDb();
  const pool = getPool();
  const res = await pool.query(
    "SELECT * FROM projects WHERE submission_status = 'APPROVED' ORDER BY created_at DESC"
  );
  return res.rows.map(rowToProject);
}

export async function dbGetProjectBySlug(slug: string): Promise<Project | null> {
  await initDb();
  const pool = getPool();
  const res = await pool.query('SELECT * FROM projects WHERE slug = $1 LIMIT 1', [slug]);
  if (res.rows.length === 0) return null;
  return rowToProject(res.rows[0]);
}

export async function dbGetProjectsByCreator(username: string): Promise<Project[]> {
  await initDb();
  const pool = getPool();
  const res = await pool.query(
    "SELECT * FROM projects WHERE creator_username = $1 AND submission_status = 'APPROVED' ORDER BY created_at DESC",
    [username]
  );
  return res.rows.map(rowToProject);
}

export async function dbGetAllProjectsAdmin(): Promise<Project[]> {
  await initDb();
  const pool = getPool();
  const res = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
  return res.rows.map(rowToProject);
}

export async function dbInsertProject(project: Project): Promise<Project> {
  await initDb();
  const pool = getPool();
  await pool.query(
    `INSERT INTO projects (
      id, slug, title, tagline, description, category, technologies,
      image_url, demo_video_url, github_url, live_demo_url,
      problem_solved, how_it_works, status, submission_status,
      collaboration_open, looking_for, creator_name, creator_username,
      creator_role, creator_avatar, creator_email, creator_whatsapp,
      allow_whatsapp_contact, creator_linkedin, creator_github,
      creator_website, admin_notes, created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
      $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30
    )`,
    [
      project.id,
      project.slug,
      project.title,
      project.tagline || null,
      project.description,
      project.category,
      project.technologies,
      project.imageUrl,
      project.demoVideoUrl || null,
      project.githubUrl || null,
      project.liveDemoUrl || null,
      project.problemSolved || null,
      project.howItWorks || null,
      project.status,
      project.submissionStatus,
      project.collaborationOpen,
      project.lookingFor,
      project.creatorName,
      project.creatorUsername,
      project.creatorRole,
      project.creatorAvatar || null,
      project.creatorEmail,
      project.creatorWhatsApp || null,
      project.allowWhatsAppContact,
      project.creatorLinkedIn || null,
      project.creatorGitHub || null,
      project.creatorWebsite || null,
      project.adminNotes || null,
      project.createdAt,
      project.updatedAt,
    ]
  );
  return project;
}

export async function dbReviewProject(
  id: string,
  decision: SubmissionStatus,
  adminNotes?: string,
  adminId?: string
): Promise<Project | null> {
  await initDb();
  const pool = getPool();
  const now = new Date().toISOString();
  const res = await pool.query(
    `UPDATE projects
     SET submission_status = $1,
         admin_notes = COALESCE($2, admin_notes),
         reviewed_at = $3,
         updated_at = $3,
         reviewed_by_id = COALESCE($4, reviewed_by_id)
     WHERE id = $5
     RETURNING *`,
    [decision, adminNotes || null, now, adminId || null, id]
  );
  if (res.rows.length === 0) return null;
  return rowToProject(res.rows[0]);
}

export async function dbGetAdminByEmail(email: string): Promise<Admin | null> {
  await initDb();
  const pool = getPool();
  const res = await pool.query(
    'SELECT * FROM admins WHERE LOWER(email) = LOWER($1) LIMIT 1',
    [email.trim()]
  );
  if (res.rows.length === 0) return null;
  return rowToAdmin(res.rows[0]);
}

export async function dbGetAdminById(id: string): Promise<Admin | null> {
  await initDb();
  const pool = getPool();
  const res = await pool.query('SELECT * FROM admins WHERE id = $1 LIMIT 1', [id]);
  if (res.rows.length === 0) return null;
  return rowToAdmin(res.rows[0]);
}

export async function dbCreateAdmin(admin: {
  id?: string;
  email: string;
  passwordHash: string;
  name: string;
  role?: AdminRole;
}): Promise<Admin> {
  await initDb();
  const pool = getPool();
  const adminId = admin.id || `admin-${Date.now()}`;
  const role = admin.role || 'ADMIN';
  const res = await pool.query(
    `INSERT INTO admins (id, email, password_hash, name, role, is_active, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, true, NOW(), NOW())
     ON CONFLICT (email) DO UPDATE SET
       password_hash = EXCLUDED.password_hash,
       name = EXCLUDED.name,
       role = EXCLUDED.role,
       updated_at = NOW()
     RETURNING *`,
    [adminId, admin.email.toLowerCase().trim(), admin.passwordHash, admin.name.trim(), role]
  );
  return rowToAdmin(res.rows[0]);
}

export async function dbUpdateAdminLastLogin(id: string): Promise<void> {
  await initDb();
  const pool = getPool();
  await pool.query('UPDATE admins SET last_login_at = NOW() WHERE id = $1', [id]);
}

export async function dbGetProjectsBySubmissionStatus(status: SubmissionStatus): Promise<Project[]> {
  await initDb();
  const pool = getPool();
  const res = await pool.query(
    'SELECT * FROM projects WHERE submission_status = $1 ORDER BY created_at DESC',
    [status]
  );
  return res.rows.map(rowToProject);
}

export async function dbGetAdminStats(): Promise<{
  pendingCount: number;
  approvedCount: number;
  declinedCount: number;
  totalProjects: number;
  totalDevelopers: number;
}> {
  await initDb();
  const pool = getPool();
  const projRes = await pool.query(`
    SELECT
      COUNT(*) FILTER (WHERE submission_status = 'PENDING') as pending,
      COUNT(*) FILTER (WHERE submission_status = 'APPROVED') as approved,
      COUNT(*) FILTER (WHERE submission_status = 'DECLINED') as declined,
      COUNT(*) as total
    FROM projects
  `);
  const devRes = await pool.query('SELECT COUNT(*) as total FROM developers');

  return {
    pendingCount: parseInt(projRes.rows[0]?.pending || '0', 10),
    approvedCount: parseInt(projRes.rows[0]?.approved || '0', 10),
    declinedCount: parseInt(projRes.rows[0]?.declined || '0', 10),
    totalProjects: parseInt(projRes.rows[0]?.total || '0', 10),
    totalDevelopers: parseInt(devRes.rows[0]?.total || '0', 10),
  };
}

export async function dbGetAllDevelopers(): Promise<Developer[]> {
  await initDb();
  const pool = getPool();
  const res = await pool.query('SELECT * FROM developers ORDER BY created_at ASC');
  return res.rows.map(rowToDeveloper);
}

export async function dbGetDeveloperByUsername(username: string): Promise<Developer | null> {
  await initDb();
  const pool = getPool();
  const res = await pool.query(
    'SELECT * FROM developers WHERE LOWER(username) = LOWER($1) LIMIT 1',
    [username]
  );
  if (res.rows.length === 0) return null;
  return rowToDeveloper(res.rows[0]);
}

export async function dbUpsertDeveloper(dev: Developer): Promise<Developer> {
  await initDb();
  const pool = getPool();
  await pool.query(
    `INSERT INTO developers (
      id, username, name, role, bio, avatar_url, skills,
      availability, collaboration_preference, featured_project_slugs,
      github_url, linkedin_url, portfolio_url, whatsapp,
      allow_whatsapp_contact, location, joined_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW()
    )
    ON CONFLICT (username) DO UPDATE SET
      name = EXCLUDED.name,
      role = EXCLUDED.role,
      bio = EXCLUDED.bio,
      avatar_url = COALESCE(EXCLUDED.avatar_url, developers.avatar_url),
      skills = EXCLUDED.skills,
      featured_project_slugs = EXCLUDED.featured_project_slugs,
      github_url = COALESCE(EXCLUDED.github_url, developers.github_url),
      linkedin_url = COALESCE(EXCLUDED.linkedin_url, developers.linkedin_url),
      portfolio_url = COALESCE(EXCLUDED.portfolio_url, developers.portfolio_url),
      whatsapp = COALESCE(EXCLUDED.whatsapp, developers.whatsapp),
      allow_whatsapp_contact = EXCLUDED.allow_whatsapp_contact,
      updated_at = NOW()`,
    [
      dev.id,
      dev.username,
      dev.name,
      dev.role,
      dev.bio,
      dev.avatarUrl || null,
      dev.skills,
      dev.availability,
      dev.collaborationPreference,
      dev.featuredProjectSlugs,
      dev.githubUrl || null,
      dev.linkedInUrl || null,
      dev.portfolioUrl || null,
      dev.whatsApp || null,
      dev.allowWhatsAppContact,
      dev.location || null,
      dev.joinedAt,
    ]
  );
  return dev;
}
