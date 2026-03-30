/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
/**
 * Quick test of Supabase Storage upload with minimal path
 */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://fjuasxkdysuaflcmujjk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdWFzeGtkeXN1YWZsY211amprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2OTgwODEsImV4cCI6MjA5MDI3NDA4MX0.IihagTnWUAwcufw1Xm0IZkR1SrxTZbnGSXOZjNmTYkk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
  // Find any small PDF from the root
  const rootDir = path.resolve(__dirname, '../../');
  const testPdf = path.join(rootDir, 'QUY TRÌNH THU LỆ PHÍ THI CHUẨN ĐẦU RA', 'QUY TRÌNH THU LỆ PHÍ THI CHUẨN ĐẦU RA.pdf');
  
  if (!fs.existsSync(testPdf)) {
    console.log('Test PDF not found:', testPdf);
    return;
  }

  const fileBuffer = fs.readFileSync(testPdf);
  console.log('File size:', fileBuffer.length, 'bytes');

  // Try with simple ASCII-only name
  const { data, error } = await supabase.storage
    .from('iso-documents')
    .upload('test/sample.pdf', fileBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (error) {
    console.error('Upload error:', JSON.stringify(error, null, 2));
  } else {
    console.log('Upload success:', data);
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('iso-documents')
      .getPublicUrl('test/sample.pdf');
    console.log('Public URL:', urlData.publicUrl);
  }
}

main().catch(console.error);
