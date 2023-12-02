import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://waycrccmqafijtoknvap.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndheWNyY2NtcWFmaWp0b2tudmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0NDIxNjQsImV4cCI6MjAxNzAxODE2NH0.awTpuG6Oih2n24D3cUTFr5srlqXR69vBtXAzoMl7YfY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
