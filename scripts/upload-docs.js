/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
/**
 * Script to upload ISO documents to Supabase Storage
 * Uses hash-based storage paths to avoid Unicode issues
 * Generates a mapping JSON for lookup
 */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SUPABASE_URL = 'https://fjuasxkdysuaflcmujjk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdWFzeGtkeXN1YWZsY211amprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2OTgwODEsImV4cCI6MjA5MDI3NDA4MX0.IihagTnWUAwcufw1Xm0IZkR1SrxTZbnGSXOZjNmTYkk';
const BUCKET = 'iso-documents';
const BASE_URL = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ROOT_DIR = path.resolve(__dirname, '../../');
const ALLOWED_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg', '.webp', '.gif'];

function makeStoragePath(relativePath) {
  // Generate a short hash for the folder path, keep the filename extension
  const ext = path.extname(relativePath);
  const hash = crypto.createHash('md5').update(relativePath).digest('hex').slice(0, 12);
  const basename = path.basename(relativePath, ext);
  
  // Determine folder from first-level directory
  const parts = relativePath.split(/[/\\]/);
  let folder = 'misc';
  if (parts.length > 1) {
    // Use first few chars + hash for folder name
    folder = hash.slice(0, 6);
  }
  
  // Use hash + extension for the filename
  return `docs/${folder}/${hash}${ext}`;
}

function collectFiles(dir, basePath = '') {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = basePath ? `${basePath}/${item.name}` : item.name;
    
    if (item.isDirectory()) {
      if (['iso-portal', 'node_modules', '.next', '.git'].includes(item.name)) continue;
      results.push(...collectFiles(fullPath, relativePath));
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        results.push({ localPath: fullPath, relativePath });
      }
    }
  }
  return results;
}

async function main() {
  console.log('📂 Scanning:', ROOT_DIR);
  const files = collectFiles(ROOT_DIR);
  console.log(`📦 Found ${files.length} files\n`);

  let uploaded = 0, failed = 0;
  const mapping = {}; // originalName -> { storagePath, publicUrl, type }

  for (const file of files) {
    const ext = path.extname(file.localPath).toLowerCase();
    const mimeMap = {
      '.pdf': 'application/pdf',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
    };
    const contentType = mimeMap[ext] || 'application/octet-stream';
    const storagePath = makeStoragePath(file.relativePath);
    const fileBuffer = fs.readFileSync(file.localPath);

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, { contentType, upsert: true });

    if (error) {
      console.error(`❌ ${file.relativePath} — ${error.message}`);
      failed++;
    } else {
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
      const publicUrl = urlData.publicUrl;
      
      // Map by original filename (basename)
      const originalName = path.basename(file.relativePath);
      mapping[originalName] = {
        storagePath,
        publicUrl,
        type: ext === '.pdf' ? 'pdf' : 'image',
        originalRelativePath: file.relativePath,
      };
      
      console.log(`✅ ${originalName} → ${storagePath}`);
      uploaded++;
    }
  }

  console.log(`\n🎉 Uploaded: ${uploaded}, Failed: ${failed}`);
  
  // Save mapping
  const mappingPath = path.join(__dirname, '../src/data/document-mapping.json');
  const mappingDir = path.dirname(mappingPath);
  if (!fs.existsSync(mappingDir)) fs.mkdirSync(mappingDir, { recursive: true });
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), 'utf8');
  console.log(`📄 Mapping saved to: src/data/document-mapping.json (${Object.keys(mapping).length} entries)`);
}

main().catch(console.error);
