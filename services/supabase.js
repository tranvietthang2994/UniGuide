import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vtesitzsuisfgpchlsuz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0ZXNpdHpzdWlzZmdwY2hsc3V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNzEwNzksImV4cCI6MjA3Mzc0NzA3OX0.Vp95sXMEaGv_a-9olaFylM2bzbwEJ_v9wccXVEvlST0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
