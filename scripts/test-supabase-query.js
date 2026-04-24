const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://fjuasxkdysuaflcmujjk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdWFzeGtkeXN1YWZsY211amprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2OTgwODEsImV4cCI6MjA5MDI3NDA4MX0.IihagTnWUAwcufw1Xm0IZkR1SrxTZbnGSXOZjNmTYkk';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
  const { data: groups, error } = await supabase
    .from('process_groups')
    .select('*, processes(*)')
    .eq('department', 'P.TCKT');
    
  console.log('Error:', error);
  console.log('Groups:', JSON.stringify(groups, null, 2));
}

main();
