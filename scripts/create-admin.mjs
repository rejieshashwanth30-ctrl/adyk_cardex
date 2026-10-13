import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import fs from 'fs';

// Load .env.local and .env
if (fs.existsSync('.env.local')) {
  try {
    process.loadEnvFile('.env.local');
  } catch {
    // fallback if process.loadEnvFile fails
  }
} else if (fs.existsSync('.env')) {
  try {
    process.loadEnvFile('.env');
  } catch {}
}

const rawConn =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_NvejApK02Wyt@ep-crimson-water-b57gv6za-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=verify-full';
const connectionString = rawConn.replace(/sslmode=(require|prefer|verify-ca)/g, 'sslmode=verify-full');

// Read arguments: node scripts/create-admin.mjs [email] [password] [name] [role]
// Or from env vars: ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, ADMIN_ROLE
const args = process.argv.slice(2);
const email = (args[0] || process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const password = (args[1] || process.env.ADMIN_PASSWORD || '').trim();
const name = (args[2] || process.env.ADMIN_NAME || 'ADYK CARDEX Administrator').trim();
const role = (args[3] || process.env.ADMIN_ROLE || 'SUPER_ADMIN').trim().toUpperCase();

async function createAdmin() {
  if (!email || !email.includes('@')) {
    console.error('❌ Error: A valid admin email is required.');
    console.error('Usage: npm run admin:create <email> <password> [name] [role]');
    console.error('Or set environment variables: ADMIN_EMAIL and ADMIN_PASSWORD');
    process.exit(1);
  }

  if (!password || password.length < 8) {
    console.error('❌ Error: Admin password must be at least 8 characters long.');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log(`Connecting to PostgreSQL production database...`);

    // Ensure admins table exists
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

    // Hash password with bcrypt salt rounds = 12
    console.log('Generating secure bcrypt password hash (work factor 12)...');
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const adminId = `admin-${Date.now()}`;

    // Upsert admin
    const res = await pool.query(
      `INSERT INTO admins (id, email, password_hash, name, role, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, true, NOW(), NOW())
       ON CONFLICT (email) DO UPDATE SET
         password_hash = EXCLUDED.password_hash,
         name = EXCLUDED.name,
         role = EXCLUDED.role,
         is_active = true,
         updated_at = NOW()
       RETURNING id, email, name, role, is_active, created_at`,
      [adminId, email, passwordHash, name, role]
    );

    const admin = res.rows[0];
    console.log('\n========================================');
    console.log('✅ ADYK CARDEX ADMINISTRATOR CONFIGURED');
    console.log('========================================');
    console.log(`ID:      ${admin.id}`);
    console.log(`Email:   ${admin.email}`);
    console.log(`Name:    ${admin.name}`);
    console.log(`Role:    ${admin.role}`);
    console.log(`Active:  ${admin.is_active}`);
    console.log(`Created: ${admin.created_at}`);
    console.log('========================================\n');
    console.log('You can now log in at: /admin/login\n');
  } catch (err) {
    console.error('❌ Failed to create admin:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

createAdmin();
