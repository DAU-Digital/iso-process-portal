const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://fjuasxkdysuaflcmujjk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdWFzeGtkeXN1YWZsY211amprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2OTgwODEsImV4cCI6MjA5MDI3NDA4MX0.IihagTnWUAwcufw1Xm0IZkR1SrxTZbnGSXOZjNmTYkk';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const mappingPath = path.join(__dirname, '../src/data/document-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

async function main() {
  console.log('Seeding processes...');
  // First, group by department and process
  const depts = {};
  
  for (const [filename, info] of Object.entries(mapping)) {
    // Replace backslashes with forward slashes for consistent splitting
    const normalizedPath = info.originalRelativePath.replace(/\\/g, '/');
    const parts = normalizedPath.split('/');
    if (parts.length < 2) continue;
    
    const dept = parts[0];
    const processName = parts[1];
    
    if (!depts[dept]) depts[dept] = {};
    if (!depts[dept][processName]) depts[dept][processName] = { documents: [], forms: [] };
    
    if (info.type === 'image') {
      depts[dept][processName].forms.push(filename);
    } else {
      depts[dept][processName].documents.push(filename);
    }
  }

  // Now, for each department, create a process_group, then create processes
  for (const [dept, processes] of Object.entries(depts)) {
    // 1. Create a group
    // Make sure id is valid, maybe just use hash or base64 of dept to avoid special chars
    const groupId = `group-${Buffer.from(dept).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)}`;
    const { data: groupData, error: groupErr } = await supabase.from('process_groups').upsert({
      id: groupId,
      department: dept,
      label: `Danh mục quy trình`,
      x: 100,
      y: 100,
      width: 1000,
      height: Math.max(600, Object.keys(processes).length * 150)
    }).select().single();
    
    if (groupErr) {
      console.error('Error creating group for', dept, groupErr.message);
      continue;
    }
    
    console.log('Created group for', dept, groupId);
    
    // 2. Create processes
    for (const [processName, data] of Object.entries(processes)) {
      const processId = `proc-${Buffer.from(processName).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 15)}`;
      
      const { error: procErr } = await supabase.from('processes').upsert({
        id: processId,
        group_id: groupId,
        title: processName,
        steps: ["Xem chi tiết quy trình"],
        step_details: [ { description: "Đính kèm tài liệu", actor: dept } ],
        documents: data.documents,
        forms: data.forms,
        status: 'completed',
      });
      
      if (procErr) {
        console.error('  Error creating process', processName, procErr.message);
      } else {
        console.log('  Created process', processName);
      }
    }
  }
  console.log('Seeding complete!');
}

main().catch(console.error);
