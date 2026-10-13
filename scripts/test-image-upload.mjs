import fs from 'fs';

if (fs.existsSync('.env.local')) {
  try { process.loadEnvFile('.env.local'); } catch {}
}

async function runUploadTests() {
  console.log('=== STARTING IMAGE UPLOAD & SUBMISSION TEST SUITE ===\n');

  // 1. Create a valid 1x1 PNG image buffer with genuine PNG magic bytes
  const validPngBuffer = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
    0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41,
    0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
    0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00,
    0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
    0x42, 0x60, 0x82
  ]);

  // 2. Test uploading valid PNG
  const formValid = new FormData();
  formValid.append('file', new Blob([validPngBuffer], { type: 'image/png' }), 'test-banner.png');

  const uploadRes = await fetch('http://localhost:3000/api/upload', {
    method: 'POST',
    body: formValid,
  });

  const uploadData = await uploadRes.json();
  console.log('1. Valid PNG upload status:', uploadRes.status);
  console.log('   Response:', uploadData);

  if (!uploadRes.ok || !uploadData.url) {
    throw new Error('Valid upload failed!');
  }
  console.log('   ✅ Valid image upload successful. Stored URL:', uploadData.url);

  // 3. Test uploading invalid file (text file disguised as image)
  const fakeBuffer = Buffer.from('THIS IS NOT A VALID IMAGE FILE JUST TEXT');
  const formInvalid = new FormData();
  formInvalid.append('file', new Blob([fakeBuffer], { type: 'image/png' }), 'fake.png');

  const invalidRes = await fetch('http://localhost:3000/api/upload', {
    method: 'POST',
    body: formInvalid,
  });
  const invalidData = await invalidRes.json();
  console.log('\n2. Fake image upload status:', invalidRes.status);
  console.log('   Expected error returned:', invalidData.error);
  if (invalidRes.status === 400 && invalidData.error.includes('validation failed')) {
    console.log('   ✅ Binary magic bytes security check strictly rejected fake file.');
  } else {
    throw new Error('Security check failed to reject invalid file!');
  }

  // 4. Test uploading oversized file (> 10 MB)
  const bigBuffer = Buffer.alloc(10.5 * 1024 * 1024); // 10.5 MB
  bigBuffer[0] = 0x89;
  bigBuffer[1] = 0x50;
  bigBuffer[2] = 0x4e;
  bigBuffer[3] = 0x47;
  const formBig = new FormData();
  formBig.append('file', new Blob([bigBuffer], { type: 'image/png' }), 'large.png');

  const bigRes = await fetch('http://localhost:3000/api/upload', {
    method: 'POST',
    body: formBig,
  });
  const bigData = await bigRes.json();
  console.log('\n3. Oversized file (> 10 MB) upload status:', bigRes.status);
  console.log('   Expected error returned:', bigData.error);
  if (bigRes.status === 400 && bigData.error.includes('10 MB')) {
    console.log('   ✅ Maximum file size constraint (10 MB) strictly enforced.');
  } else {
    throw new Error('Failed to reject oversized file!');
  }

  // 5. Test submitting a project WITHOUT an image
  const emptyImageSubmitRes = await fetch('http://localhost:3000/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      creatorName: 'Maya Sharma',
      creatorEmail: 'maya@example.com',
      projectTitle: 'Telemetry Visualizer',
      projectDescription: 'A comprehensive real-time telemetry visualizer for high-throughput edge nodes.',
      category: 'Creative Technology / Web Platform',
      technologies: ['Next.js', 'TypeScript'],
      imageUrl: '', // Missing image!
    }),
  });
  const emptyImageData = await emptyImageSubmitRes.json();
  console.log('\n4. Submission without image status:', emptyImageSubmitRes.status);
  console.log('   Expected error returned:', emptyImageData.error);
  if (emptyImageSubmitRes.status === 400 && emptyImageData.error.includes('project image')) {
    console.log('   ✅ Required image constraint strictly enforced on submission API.');
  } else {
    throw new Error('Submission API allowed empty image!');
  }

  // 6. Test submitting a project WITH the uploaded image
  const validSubmitRes = await fetch('http://localhost:3000/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      creatorName: 'Maya Sharma',
      creatorEmail: 'maya@example.com',
      projectTitle: 'Telemetry Visualizer Real Upload',
      projectDescription: 'A comprehensive real-time telemetry visualizer for high-throughput edge nodes.',
      category: 'Creative Technology / Web Platform',
      technologies: ['Next.js', 'TypeScript', 'WebSockets'],
      imageUrl: uploadData.url, // Real uploaded URL!
    }),
  });
  const validSubmitData = await validSubmitRes.json();
  console.log('\n5. Valid submission with uploaded image status:', validSubmitRes.status);
  console.log('   Response:', validSubmitData);
  if (validSubmitRes.ok && validSubmitData.success) {
    console.log('   ✅ Submission created with status PENDING.');
    console.log('   ✅ Stored image URL:', uploadData.url);
  } else {
    throw new Error('Valid submission failed!');
  }

  console.log('\n=============================================');
  console.log('🎉 ALL UPLOAD & SUBMISSION TESTS PASSED!');
  console.log('=============================================');
}

runUploadTests().catch((e) => {
  console.error('Test suite failed:', e);
  process.exit(1);
});
