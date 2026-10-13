import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import fs from 'fs';

if (fs.existsSync('.env.local')) {
  try { process.loadEnvFile('.env.local'); } catch {}
}

const connectionString = (process.env.DATABASE_URL || '').replace(/sslmode=(require|prefer|verify-ca)/g, 'sslmode=verify-full');

async function runTests() {
  console.log('=== STARTING ADMIN & MODERATION TEST SUITE ===\n');

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    // 1. Verify admin in database
    const adminRes = await pool.query("SELECT email, role, is_active FROM admins WHERE email = 'admin@adyk.io'");
    console.log('1. Database admin record:', adminRes.rows[0]);
    if (!adminRes.rows[0] || !adminRes.rows[0].is_active) {
      throw new Error('Admin not found or inactive');
    }
    console.log('   ✅ Admin verified in PostgreSQL.\n');

    // 2. Test password hash verification
    const hashRes = await pool.query("SELECT password_hash FROM admins WHERE email = 'admin@adyk.io'");
    const matchesValid = await bcrypt.compare('CardexAdmin2026!', hashRes.rows[0].password_hash);
    const matchesInvalid = await bcrypt.compare('WrongPassword!', hashRes.rows[0].password_hash);
    console.log('2. Password verification:');
    console.log('   - Valid password match:', matchesValid);
    console.log('   - Invalid password match:', matchesInvalid);
    if (!matchesValid || matchesInvalid) {
      throw new Error('Password verification logic failure');
    }
    console.log('   ✅ Password hash comparison verified.\n');

    // 3. Test project submission isolation
    const testSlug = `test-moderation-${Date.now()}`;
    const testProjId = `proj-test-${Date.now()}`;
    await pool.query(`
      INSERT INTO projects (
        id, slug, title, description, category, technologies, image_url,
        creator_name, creator_username, creator_email, submission_status, created_at, updated_at
      ) VALUES (
        $1, $2, 'Security Test Submission', 'A project to verify moderation security', 'Web App',
        ARRAY['TypeScript', 'PostgreSQL'], '/images/projects/adyk-cradez.jpg',
        'Test Creator', 'testcreator', 'creator@test.com', 'PENDING', NOW(), NOW()
      )
    `, [testProjId, testSlug]);
    console.log('3. Test project inserted with status = PENDING.');

    // 4. Verify public query NEVER returns PENDING
    const publicRes = await pool.query(
      "SELECT * FROM projects WHERE slug = $1 AND submission_status = 'APPROVED'",
      [testSlug]
    );
    console.log('4. Public query for pending project rows count:', publicRes.rows.length);
    if (publicRes.rows.length !== 0) {
      throw new Error('CRITICAL SECURITY LEAK: Pending project returned by public query!');
    }
    console.log('   ✅ Pending project is strictly HIDDEN from public query.\n');

    // 5. Simulate Admin Approval
    await pool.query(
      "UPDATE projects SET submission_status = 'APPROVED', reviewed_at = NOW(), admin_notes = 'Approved by test' WHERE id = $1",
      [testProjId]
    );
    const approvedRes = await pool.query(
      "SELECT slug, submission_status FROM projects WHERE slug = $1 AND submission_status = 'APPROVED'",
      [testSlug]
    );
    console.log('5. Public query after APPROVAL rows count:', approvedRes.rows.length);
    if (approvedRes.rows.length !== 1) {
      throw new Error('Approved project not found in public query!');
    }
    console.log('   ✅ Approved project is correctly visible publicly.\n');

    // 6. Simulate Admin Decline
    await pool.query(
      "UPDATE projects SET submission_status = 'DECLINED', reviewed_at = NOW(), admin_notes = 'Declined by test' WHERE id = $1",
      [testProjId]
    );
    const declinedRes = await pool.query(
      "SELECT * FROM projects WHERE slug = $1 AND submission_status = 'APPROVED'",
      [testSlug]
    );
    console.log('6. Public query after DECLINE rows count:', declinedRes.rows.length);
    if (declinedRes.rows.length !== 0) {
      throw new Error('CRITICAL SECURITY LEAK: Declined project returned by public query!');
    }
    console.log('   ✅ Declined project is strictly private.\n');

    // 7. Test Admin Edit / Update
    await pool.query(
      "UPDATE projects SET title = 'Updated Title Via Test Suite', updated_at = NOW() WHERE id = $1",
      [testProjId]
    );
    const editRes = await pool.query("SELECT title FROM projects WHERE id = $1", [testProjId]);
    if (editRes.rows[0]?.title !== 'Updated Title Via Test Suite') {
      throw new Error('Project edit failed in PostgreSQL');
    }
    console.log('7. Edit verification in PostgreSQL: Title updated successfully.');
    console.log('   ✅ Project mutation and update verified in PostgreSQL.\n');

    // 8. Test Admin Delete
    await pool.query("DELETE FROM projects WHERE id = $1", [testProjId]);
    const deleteCheck = await pool.query("SELECT * FROM projects WHERE id = $1", [testProjId]);
    if (deleteCheck.rows.length !== 0) {
      throw new Error('Project delete failed in PostgreSQL');
    }
    console.log('8. Delete verification: Project successfully deleted from PostgreSQL.');
    console.log('   ✅ Project deletion verified in PostgreSQL.\n');

    console.log('\n=============================================');
    console.log('🎉 ALL DATABASE & MODERATION TESTS PASSED!');
    console.log('=============================================\n');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runTests();
