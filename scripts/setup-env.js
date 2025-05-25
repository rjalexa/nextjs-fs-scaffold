#!/usr/bin/env node

import { existsSync, copyFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Environment file mappings: [source, destination]
const envFiles = [
  ['apps/frontend/.env.example', 'apps/frontend/.env'],
  ['apps/mock-backend/.env.example', 'apps/mock-backend/.env'],
  ['.env.example', '.env']
];

console.log('🔧 Setting up environment files...');

let filesCreated = 0;
let filesSkipped = 0;

for (const [source, dest] of envFiles) {
  const sourcePath = join(rootDir, source);
  const destPath = join(rootDir, dest);
  
  // Check if source exists
  if (!existsSync(sourcePath)) {
    console.log(`⚠️  Source file not found: ${source}`);
    continue;
  }
  
  // Check if destination already exists
  if (existsSync(destPath)) {
    console.log(`✅ Environment file already exists: ${dest}`);
    filesSkipped++;
    continue;
  }
  
  try {
    // Ensure destination directory exists
    const destDir = dirname(destPath);
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }
    
    // Copy the file
    copyFileSync(sourcePath, destPath);
    console.log(`📝 Created environment file: ${dest}`);
    filesCreated++;
  } catch (error) {
    console.error(`❌ Failed to create ${dest}:`, error.message);
  }
}

if (filesCreated > 0) {
  console.log(`\n✨ Created ${filesCreated} environment file(s)`);
  console.log('📋 Please review and update the environment variables as needed');
}

if (filesSkipped > 0) {
  console.log(`\n⏭️  Skipped ${filesSkipped} existing environment file(s)`);
}

if (filesCreated === 0 && filesSkipped === 0) {
  console.log('\n🎯 No environment files to set up');
}

console.log('\n🚀 Environment setup complete!');
