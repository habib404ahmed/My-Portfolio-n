import { build } from 'esbuild';
import fs from 'fs';

async function run() {
  console.log('[Build API] Bundling serverless API functions for Vercel...');
  await build({
    entryPoints: ['server/handler.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node20',
    packages: 'external',
    outfile: 'api/index.js',
  });

  fs.copyFileSync('api/index.js', 'api/[...path].js');
  console.log('[Build API] Generated api/index.js and api/[...path].js successfully.');
}

run().catch((err) => {
  console.error('[Build API] Error:', err);
  process.exit(1);
});
