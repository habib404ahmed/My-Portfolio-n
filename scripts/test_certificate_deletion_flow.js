import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'http://localhost:5173';

async function runTests() {
  console.log('================================================================');
  console.log('RUNNING PHASE 13.6 CERTIFICATE DELETION END-TO-END VERIFICATION');
  console.log('================================================================\n');

  // Step 1: Authenticate as Admin
  console.log('[Step 1] Authenticating admin user...');
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin123' }),
  });
  if (!loginRes.ok) throw new Error('Admin login failed: ' + (await loginRes.text()));
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log('✓ Admin authenticated successfully.\n');

  // Step 2: Security Verification - Unauthenticated Delete Request
  console.log('[Step 2] Testing security: Unauthenticated deletion attempt...');
  const unauthRes = await fetch(`${BASE_URL}/api/certificates/cisco-modern-ai`, {
    method: 'DELETE',
  });
  if (unauthRes.status === 401) {
    console.log('✓ Unauthenticated deletion correctly blocked with 401 Unauthorized.\n');
  } else {
    throw new Error(`Expected 401 for unauthenticated deletion, got ${unauthRes.status}`);
  }

  // Step 3: Nonexistent Certificate Deletion
  console.log('[Step 3] Testing non-existent certificate deletion...');
  const notFoundRes = await fetch(`${BASE_URL}/api/certificates/nonexistent-cert-99999`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (notFoundRes.status === 404) {
    const errData = await notFoundRes.json();
    console.log(`✓ Nonexistent certificate deletion correctly responded with 404: "${errData.error}"\n`);
  } else {
    throw new Error(`Expected 404 for nonexistent certificate, got ${notFoundRes.status}`);
  }

  // Step 4: Upload a real certificate document
  console.log('[Step 4] Uploading test certificate document...');
  const dummyPdfBytes = '%PDF-1.4\n%âãÏÓ\n1 0 obj\n<< /Title (Test Deletion Credential) >>\nendobj\ntrailer\n<< >>\n%%EOF';
  const uploadFormData = new FormData();
  uploadFormData.append('file', new Blob([dummyPdfBytes], { type: 'application/pdf' }), 'automated-deletion-test-cert.pdf');

  const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: uploadFormData,
  });
  if (!uploadRes.ok) throw new Error('Failed to upload test certificate file: ' + (await uploadRes.text()));
  const uploadData = await uploadRes.json();
  const uploadedFileUrl = uploadData.url;
  const uploadedFilename = uploadData.filename;
  console.log(`✓ Test document uploaded to: ${uploadedFileUrl} (File: ${uploadedFilename})`);

  // Verify file physically exists on disk in uploads directory
  const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
  const physicalFilePath = path.resolve(uploadsDir, uploadedFilename);
  if (!fs.existsSync(physicalFilePath)) {
    throw new Error(`Expected uploaded file at ${physicalFilePath} to exist on disk`);
  }
  console.log('✓ Confirmed physical file exists on disk in storage.\n');

  // Step 5: Add a new certificate to draft and publish it
  console.log('[Step 5] Adding test certificate to persistent draft & published data...');
  const draftGetRes = await fetch(`${BASE_URL}/api/content/draft`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const draftContent = await draftGetRes.json();
  const initialCertCount = draftContent.certifications?.length || 0;

  const testCertId = `test-cert-${Date.now()}`;
  const testCertTitle = 'Automated Deletion Test Certificate 2026';
  const newCert = {
    id: testCertId,
    number: String(initialCertCount + 1).padStart(2, '0'),
    index: String(initialCertCount + 1).padStart(2, '0'),
    title: testCertTitle,
    issuer: 'Quality Engineering Labs',
    type: 'Certificate of Verification',
    recipient: 'Md Habib Munsar Ahmed',
    date: '11 October 2026',
    year: 2026,
    category: 'ai',
    categoryLabel: 'AI / Machine Learning',
    image: uploadedFileUrl,
    imageWebp: uploadedFileUrl,
    downloadUrl: uploadedFileUrl,
    verified: true,
    description: 'Test certificate designed to test end-to-end deletion and storage cleanup.',
    visible: true,
    fileName: uploadedFilename,
  };

  draftContent.certifications.push(newCert);

  // Save draft
  const saveDraftRes = await fetch(`${BASE_URL}/api/content/draft`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(draftContent),
  });
  if (!saveDraftRes.ok) throw new Error('Failed to save draft: ' + (await saveDraftRes.text()));

  // Publish content
  const publishRes = await fetch(`${BASE_URL}/api/content/publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ label: 'Test Certificate Publish' }),
  });
  if (!publishRes.ok) throw new Error('Failed to publish: ' + (await publishRes.text()));
  console.log(`✓ Test certificate "${testCertId}" added and published (total count: ${initialCertCount + 1}).\n`);

  // Verify it exists in public portfolio
  const publicRes1 = await fetch(`${BASE_URL}/api/content`);
  const publicContent1 = await publicRes1.json();
  const foundInPublic1 = publicContent1.certifications.some((c) => c.id === testCertId);
  if (!foundInPublic1) throw new Error('Expected test certificate to be present in public content before deletion');
  console.log('✓ Confirmed test certificate is present in public portfolio.\n');

  // Step 6: Execute Real Deletion via DELETE /api/certificates/:id
  console.log(`[Step 6] Deleting certificate "${testCertId}" via DELETE /api/certificates/${testCertId}...`);
  const deleteRes = await fetch(`${BASE_URL}/api/certificates/${testCertId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!deleteRes.ok) throw new Error('Delete request failed: ' + (await deleteRes.text()));
  const deleteData = await deleteRes.json();
  console.log('✓ Server responded with success:', deleteData);

  // Step 7: Verify Database Record Deletion
  console.log('\n[Step 7] Verifying database records on disk...');
  const draftFile = path.resolve(process.cwd(), 'data', 'draft-content.json');
  const publishedFile = path.resolve(process.cwd(), 'data', 'published-content.json');

  const draftOnDisk = JSON.parse(fs.readFileSync(draftFile, 'utf-8'));
  const publishedOnDisk = JSON.parse(fs.readFileSync(publishedFile, 'utf-8'));

  const existsInDraftDisk = draftOnDisk.certifications.some((c) => c.id === testCertId);
  const existsInPublishedDisk = publishedOnDisk.certifications.some((c) => c.id === testCertId);

  if (existsInDraftDisk) throw new Error('FAILED: Certificate record still exists in draft-content.json on disk!');
  if (existsInPublishedDisk) throw new Error('FAILED: Certificate record still exists in published-content.json on disk!');
  console.log('✓ Verified: Certificate permanently removed from draft-content.json and published-content.json on disk.');

  // Step 8: Verify Physical File Cleanup from Storage
  console.log('\n[Step 8] Verifying storage file cleanup...');
  const fileStillOnDisk = fs.existsSync(physicalFilePath);
  if (fileStillOnDisk) {
    throw new Error(`FAILED: Associated file "${physicalFilePath}" was NOT removed from storage!`);
  }
  console.log(`✓ Verified: Associated file "${uploadedFilename}" was completely removed from public/uploads.`);

  // Step 9: Verify Persistence After Fresh Server Fetch (Refresh Simulation)
  console.log('\n[Step 9] Simulating page refresh and verifying persistence...');
  const draftRefreshRes = await fetch(`${BASE_URL}/api/content/draft`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const draftRefreshed = await draftRefreshRes.json();
  const existsInDraftRefreshed = draftRefreshed.certifications.some((c) => c.id === testCertId);
  if (existsInDraftRefreshed) throw new Error('FAILED: Certificate reappeared in admin draft upon refresh!');

  const publicRefreshRes = await fetch(`${BASE_URL}/api/content`);
  const publicRefreshed = await publicRefreshRes.json();
  const existsInPublicRefreshed = publicRefreshed.certifications.some((c) => c.id === testCertId);
  if (existsInPublicRefreshed) throw new Error('FAILED: Certificate reappeared in public portfolio upon refresh!');

  console.log('✓ Verified: Deletion persisted across refresh in both Admin Studio and Public Portfolio.');

  // Step 10: Verify Other Certificates and Default Assets are Preserved
  console.log('\n[Step 10] Verifying other certificates and static assets are preserved...');
  const defaultCerts = ['cisco-modern-ai', 'ethical-hacking'];
  for (const defId of defaultCerts) {
    const inDraft = draftRefreshed.certifications.some((c) => c.id === defId);
    const inPublic = publicRefreshed.certifications.some((c) => c.id === defId);
    if (!inDraft || !inPublic) throw new Error(`FAILED: Unrelated certificate "${defId}" was accidentally modified or lost!`);
  }
  console.log('✓ Verified: Unrelated certificates (Cisco Modern AI, Ethical Hacking, etc.) remain intact.');

  // Check static asset
  const staticAssetPath = path.resolve(process.cwd(), 'public', 'assets', 'certificates', '01-cisco-modern-ai.jpg');
  if (!fs.existsSync(staticAssetPath)) {
    throw new Error('FAILED: Default static asset 01-cisco-modern-ai.jpg was missing or deleted!');
  }
  console.log('✓ Verified: Static repository assets in /assets/certificates/ are safely preserved.');

  // Step 11: Shared File Safety Verification
  console.log('\n[Step 11] Verifying shared file safety...');
  // Upload a file to share between two certs
  const sharedFormData = new FormData();
  sharedFormData.append('file', new Blob([dummyPdfBytes], { type: 'application/pdf' }), 'shared-document-test.pdf');
  const sharedUploadRes = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: sharedFormData,
  });
  const sharedUploadData = await sharedUploadRes.json();
  const sharedFilePath = path.resolve(uploadsDir, sharedUploadData.filename);

  const certA = {
    id: `cert-shared-a-${Date.now()}`,
    number: '98',
    index: '98',
    title: 'Shared Test Cert A',
    issuer: 'Shared Org',
    type: 'Cert',
    recipient: 'Habib',
    date: '2026',
    year: 2026,
    category: 'ai',
    categoryLabel: 'AI',
    image: sharedUploadData.url,
    downloadUrl: sharedUploadData.url,
    verified: true,
    description: 'Shared cert A',
    visible: true,
  };
  const certB = {
    id: `cert-shared-b-${Date.now()}`,
    number: '99',
    index: '99',
    title: 'Shared Test Cert B',
    issuer: 'Shared Org',
    type: 'Cert',
    recipient: 'Habib',
    date: '2026',
    year: 2026,
    category: 'security',
    categoryLabel: 'Security',
    image: sharedUploadData.url,
    downloadUrl: sharedUploadData.url,
    verified: true,
    description: 'Shared cert B',
    visible: true,
  };

  draftRefreshed.certifications.push(certA, certB);
  await fetch(`${BASE_URL}/api/content/draft`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(draftRefreshed),
  });
  await fetch(`${BASE_URL}/api/content/publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ label: 'Shared Certs' }),
  });

  // Delete cert A
  console.log('Deleting Cert A (file is shared with Cert B)...');
  const delARes = await fetch(`${BASE_URL}/api/certificates/${certA.id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const delAData = await delARes.json();
  console.log('Cert A delete response:', delAData);

  // Shared file MUST NOT be deleted because Cert B still uses it!
  if (!fs.existsSync(sharedFilePath)) {
    throw new Error('FAILED: Shared file was deleted while Cert B was still referencing it!');
  }
  console.log('✓ Verified: Shared file was safely preserved while referenced by Cert B.');

  // Now delete cert B
  console.log('Deleting Cert B (no references remaining)...');
  const delBRes = await fetch(`${BASE_URL}/api/certificates/${certB.id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const delBData = await delBRes.json();
  console.log('Cert B delete response:', delBData);

  // Now shared file MUST be cleaned up
  if (fs.existsSync(sharedFilePath)) {
    throw new Error('FAILED: File was not cleaned up after last referencing certificate was deleted!');
  }
  console.log('✓ Verified: Shared file was cleaned up once all referencing records were removed.');

  console.log('\n================================================================');
  console.log('ALL PHASE 13.6 CERTIFICATE DELETION ACCEPTANCE TESTS PASSED! ✓');
  console.log('================================================================');
}

runTests().catch((err) => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
