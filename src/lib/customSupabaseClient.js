import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mgrfkmswspzxxvumeklk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ncmZrbXN3c3B6eHh2dW1la2xrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNjYwMzAsImV4cCI6MjA2Njc0MjAzMH0.QvfFg8W2Sv3cPyTWZaF8zMoXitAibG-RW9aOBIFBZ2M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
