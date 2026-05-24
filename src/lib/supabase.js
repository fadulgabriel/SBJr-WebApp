import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ikjzdjxtvwujxzfpfaqt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlranpkanh0dnd1anh6ZnBmYXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDA0MDAsImV4cCI6MjA5NTE3NjQwMH0._MzXLBm_LKs6GbTuAP-QeL3uUJejpN9EI6irc-jnwWs'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
