const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const mappingPath = path.join(__dirname, '../src/data/document-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// First, group by department and process
const depts = {};

for (const [filename, info] of Object.entries(mapping)) {
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

let sql = `-- Supabase Seed SQL for ISO Processes\n\n`;

sql += `-- Drop the check constraint that restricts department names\n`;
sql += `ALTER TABLE public.process_groups DROP CONSTRAINT IF EXISTS process_groups_department_check;\n\n`;

for (const [dept, processes] of Object.entries(depts)) {
  const groupId = `group-${crypto.createHash('md5').update(dept).digest('hex').slice(0, 10)}`;
  
  sql += `-- Department: ${dept}\n`;
  sql += `INSERT INTO public.process_groups (id, department, label, x, y, width, height) VALUES \n`;
  sql += `('${groupId}', '${dept.replace(/'/g, "''")}', 'Danh mục quy trình', 100, 100, 1000, ${Math.max(600, Object.keys(processes).length * 150)})\n`;
  sql += `ON CONFLICT (id) DO NOTHING;\n\n`;
  
  for (const [processName, data] of Object.entries(processes)) {
    const processId = `proc-${crypto.createHash('md5').update(dept + '_' + processName).digest('hex').slice(0, 16)}`;
    
    const docsJson = JSON.stringify(data.documents).replace(/'/g, "''");
    const formsJson = JSON.stringify(data.forms).replace(/'/g, "''");
    const stepsJson = JSON.stringify(["Xem chi tiết quy trình"]).replace(/'/g, "''");
    const stepDetailsJson = JSON.stringify([{ description: "Đính kèm tài liệu", actor: dept }]).replace(/'/g, "''");
    
    sql += `INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES \n`;
    sql += `('${processId}', '${groupId}', '${processName.replace(/'/g, "''")}', '${stepsJson}'::jsonb, '${stepDetailsJson}'::jsonb, '${docsJson}'::jsonb, '${formsJson}'::jsonb, 'completed')\n`;
    sql += `ON CONFLICT (id) DO NOTHING;\n\n`;
  }
}

const outputPath = path.join(__dirname, 'seed-processes.sql');
fs.writeFileSync(outputPath, sql);
console.log('Generated SQL to:', outputPath);
