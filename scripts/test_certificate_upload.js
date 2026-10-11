import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'http://localhost:5173';

async function runTests() {
  console.log('=====================================================');
  console.log('RUNNING PHASE 11.3 CERTIFICATE FILE UPLOAD ACCEPTANCE TESTS');
  console.log('=====================================================\n');

  // Test 10: Unauthenticated users cannot upload certificate files
  console.log('[Test 10] Security verification: Unauthenticated upload attempt...');
  const fakeFormData = new FormData();
  const dummyBlob = new Blob(['%PDF-1.4 sample content'], { type: 'application/pdf' });
  fakeFormData.append('file', dummyBlob, 'test.pdf');

  const unauthRes = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    body: fakeFormData,
  });
  if (unauthRes.status === 401) {
    console.log('✓ Unauthenticated upload correctly rejected with 401 Unauthorized');
  } else {
    throw new Error(`Expected 401 for unauthenticated upload, got ${unauthRes.status}`);
  }

  // Authenticate as Admin
  console.log('\nAuthenticating admin user...');
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin123' }),
  });
  if (!loginRes.ok) throw new Error('Admin login failed: ' + (await loginRes.text()));
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log('✓ Admin authenticated successfully');

  // Test 8: Invalid file types and oversized files are rejected
  console.log('\n[Test 8] File validation rejection (invalid types and oversized files)...');

  // 8a: Executable file / invalid extension
  const exeFormData = new FormData();
  exeFormData.append('file', new Blob(['MZ\x90\x00\x03'], { type: 'application/octet-stream' }), 'malware.exe');
  const exeRes = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: exeFormData,
  });
  if (exeRes.status === 400) {
    const err = await exeRes.json();
    console.log(`✓ Executable file rejected (Status 400): ${err.error}`);
  } else {
    throw new Error(`Expected 400 for executable, got ${exeRes.status}`);
  }

  // 8b: Spoofed HTML file with .pdf extension
  const spoofFormData = new FormData();
  spoofFormData.append('file', new Blob(['<!DOCTYPE html><html><script>alert(1)</script></html>'], { type: 'application/pdf' }), 'spoof.pdf');
  const spoofRes = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: spoofFormData,
  });
  if (spoofRes.status === 400) {
    const err = await spoofRes.json();
    console.log(`✓ Spoofed HTML file rejected (Status 400): ${err.error}`);
  } else {
    throw new Error(`Expected 400 for spoofed HTML, got ${spoofRes.status}`);
  }

  // 8c: Oversized file (>10MB)
  const hugeBuffer = new Uint8Array(11 * 1024 * 1024); // 11 MB
  // Set PDF header so it passes format check if size wasn't checked
  hugeBuffer[0] = 0x25; hugeBuffer[1] = 0x50; hugeBuffer[2] = 0x44; hugeBuffer[3] = 0x46; hugeBuffer[4] = 0x2d;
  const hugeFormData = new FormData();
  hugeFormData.append('file', new Blob([hugeBuffer], { type: 'application/pdf' }), 'huge.pdf');
  const hugeRes = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: hugeFormData,
  });
  if (hugeRes.status === 400) {
    const err = await hugeRes.json();
    console.log(`✓ Oversized file (>10MB) rejected (Status 400): ${err.error}`);
  } else {
    throw new Error(`Expected 400 for oversized file, got ${hugeRes.status}`);
  }

  // Test 1: Upload a valid PDF certificate
  console.log('\n[Test 1] Upload valid PDF certificate document...');
  const pdfHeader = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xc4, 0xe5, 0xf2, 0xe5, 0x0a]);
  const pdfFormData = new FormData();
  pdfFormData.append('file', new Blob([pdfHeader], { type: 'application/pdf' }), 'Verified_AWS_Architect.pdf');
  const pdfRes = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: pdfFormData,
  });
  if (!pdfRes.ok) throw new Error('PDF upload failed: ' + (await pdfRes.text()));
  const pdfData = await pdfRes.json();
  console.log(`✓ PDF uploaded successfully: ${pdfData.url} (${pdfData.size} bytes)`);

  // Test 2: Upload valid PNG and JPEG certificates
  console.log('\n[Test 2] Upload valid PNG & JPEG certificate images...');
  const pngHeader = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52]);
  const pngFormData = new FormData();
  pngFormData.append('file', new Blob([pngHeader], { type: 'image/png' }), 'Certificate_Badge.png');
  const pngRes = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: pngFormData,
  });
  if (!pngRes.ok) throw new Error('PNG upload failed: ' + (await pngRes.text()));
  const pngData = await pngRes.json();
  console.log(`✓ PNG uploaded successfully: ${pngData.url}`);

  const jpgHeader = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01]);
  const jpgFormData = new FormData();
  jpgFormData.append('file', new Blob([jpgHeader], { type: 'image/jpeg' }), 'Certificate_Scan.jpg');
  const jpgRes = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: jpgFormData,
  });
  if (!jpgRes.ok) throw new Error('JPEG upload failed: ' + (await jpgRes.text()));
  const jpgData = await jpgRes.json();
  console.log(`✓ JPEG uploaded successfully: ${jpgData.url}`);

  // Test 5: Save draft certificate with uploaded PDF and refresh without losing file
  console.log('\n[Test 5] Add new certificate with PDF to draft and persist...');
  const draftGetRes = await fetch(`${BASE_URL}/api/content/draft`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const currentDraft = await draftGetRes.json();

  const testCertId = `cert-test-${Date.now()}`;
  const newCertificate = {
    id: testCertId,
    number: String(currentDraft.certifications.length + 1).padStart(2, '0'),
    index: String(currentDraft.certifications.length + 1).padStart(2, '0'),
    title: 'Cloud Solutions Architecture Certified',
    issuer: 'Amazon Web Services',
    type: 'Professional Credential',
    recipient: 'Md Habib Munsar Ahmed',
    date: '2026',
    year: 2026,
    category: 'ai',
    categoryLabel: 'AI / Machine Learning',
    image: pdfData.url,
    imageWebp: pdfData.url,
    downloadUrl: pdfData.url,
    verified: true,
    description: 'Advanced distributed architecture and system reliability.',
    visible: true,
    credentialId: 'AWS-CSA-2026-X99',
    verificationUrl: 'https://aws.amazon.com/verification/AWS-CSA-2026-X99',
    fileName: pdfData.originalName,
    fileSize: pdfData.size,
    fileType: 'pdf',
  };

  const updatedCertifications = [...currentDraft.certifications, newCertificate];
  const saveDraftRes = await fetch(`${BASE_URL}/api/content/draft`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...currentDraft,
      certifications: updatedCertifications,
    }),
  });
  if (!saveDraftRes.ok) throw new Error('Draft save failed: ' + (await saveDraftRes.text()));
  console.log('✓ Certificate saved to draft with uploaded PDF reference');

  // Verify refresh loads the exact file and metadata
  const verifyDraftRes = await fetch(`${BASE_URL}/api/content/draft`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const reloadedDraft = await verifyDraftRes.json();
  const foundCert = reloadedDraft.certifications.find((c) => c.id === testCertId);
  if (!foundCert) throw new Error('Saved certificate not found in draft on reload');
  if (foundCert.downloadUrl !== pdfData.url) throw new Error('File URL did not match uploaded URL');
  if (foundCert.credentialId !== 'AWS-CSA-2026-X99') throw new Error('Credential ID mismatch');
  console.log(`✓ Saved and refreshed without losing file: ${foundCert.downloadUrl}`);

  // Test 6: Edit certificate and replace file
  console.log('\n[Test 6] Edit certificate and replace its file document with PNG...');
  const replacedCerts = reloadedDraft.certifications.map((c) => {
    if (c.id === testCertId) {
      return {
        ...c,
        image: pngData.url,
        imageWebp: pngData.url,
        downloadUrl: pngData.url,
        fileName: pngData.originalName,
        fileSize: pngData.size,
        fileType: 'image',
      };
    }
    return c;
  });

  await fetch(`${BASE_URL}/api/content/draft`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...reloadedDraft,
      certifications: replacedCerts,
    }),
  });

  const checkReplacedRes = await fetch(`${BASE_URL}/api/content/draft`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const checkReplacedDraft = await checkReplacedRes.json();
  const replacedCert = checkReplacedDraft.certifications.find((c) => c.id === testCertId);
  if (replacedCert.downloadUrl !== pngData.url) throw new Error('Replaced file URL mismatch');
  if (replacedCert.title !== 'Cloud Solutions Architecture Certified') throw new Error('Title was altered during replace');
  if (replacedCert.issuer !== 'Amazon Web Services') throw new Error('Issuer was altered during replace');
  console.log(`✓ Certificate file replaced with PNG while preserving metadata: ${replacedCert.downloadUrl}`);

  // Test 7: Remove file without deleting metadata
  console.log('\n[Test 7] Remove file document while retaining certificate record metadata...');
  const removedFileCerts = checkReplacedDraft.certifications.map((c) => {
    if (c.id === testCertId) {
      return {
        ...c,
        image: '',
        imageWebp: '',
        downloadUrl: '',
        fileName: undefined,
        fileSize: undefined,
      };
    }
    return c;
  });

  await fetch(`${BASE_URL}/api/content/draft`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...checkReplacedDraft,
      certifications: removedFileCerts,
    }),
  });

  const checkRemovedRes = await fetch(`${BASE_URL}/api/content/draft`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const checkRemovedDraft = await checkRemovedRes.json();
  const certWithoutFile = checkRemovedDraft.certifications.find((c) => c.id === testCertId);
  if (certWithoutFile.downloadUrl !== '') throw new Error('File URL was not cleared');
  if (certWithoutFile.title !== 'Cloud Solutions Architecture Certified') throw new Error('Title lost');
  if (certWithoutFile.verificationUrl !== 'https://aws.amazon.com/verification/AWS-CSA-2026-X99') throw new Error('Verification URL lost');
  console.log('✓ File removed successfully while preserving certificate metadata & verification URL');

  // Test 9: Public portfolio displays published certificate correctly
  console.log('\n[Test 9] Publish draft and verify public portfolio endpoint...');
  // Restore document to PDF before publishing
  const finalCerts = checkRemovedDraft.certifications.map((c) => {
    if (c.id === testCertId) {
      return {
        ...c,
        image: pdfData.url,
        imageWebp: pdfData.url,
        downloadUrl: pdfData.url,
        fileName: pdfData.originalName,
        fileSize: pdfData.size,
        fileType: 'pdf',
      };
    }
    return c;
  });

  await fetch(`${BASE_URL}/api/content/draft`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...checkRemovedDraft,
      certifications: finalCerts,
    }),
  });

  const publishRes = await fetch(`${BASE_URL}/api/content/publish`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!publishRes.ok) throw new Error('Publish failed: ' + (await publishRes.text()));
  console.log('✓ Changes published to public website');

  // Check public endpoint
  const publicRes = await fetch(`${BASE_URL}/api/content`);
  const publicContent = await publicRes.json();
  const publicCert = publicContent.certifications.find((c) => c.id === testCertId);
  if (!publicCert) throw new Error('Published certificate not found in public content');
  if (publicCert.downloadUrl !== pdfData.url) throw new Error('Public certificate file URL does not match published URL');
  console.log(`✓ Public portfolio serves published certificate with document: ${publicCert.title} (${publicCert.downloadUrl})`);

  // Test 11: Existing certificates continue to work
  console.log('\n[Test 11] Existing certificate verification...');
  const ciscoCert = publicContent.certifications.find((c) => c.id === 'cisco-modern-ai');
  if (!ciscoCert) throw new Error('Existing Cisco Modern AI certificate missing');
  console.log(`✓ Existing certificate preserved: "${ciscoCert.title}" issued by ${ciscoCert.issuer}`);

  console.log('\n=====================================================');
  console.log('ALL PHASE 11.3 CERTIFICATE UPLOAD ACCEPTANCE TESTS PASSED!');
  console.log('=====================================================\n');
}

runTests().catch((err) => {
  console.error('\n❌ Test failed:', err.message || err);
  process.exit(1);
});
