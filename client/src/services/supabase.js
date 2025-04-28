import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rdbwacggztosrvjamrrm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkYndhY2dnenRvc3J2amFtcnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMDIzNzYsImV4cCI6MjA1ODY3ODM3Nn0.qZYZebg3E0R91ShWweojC-9ICGBhPrmI3LhcmntLhZQ";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
