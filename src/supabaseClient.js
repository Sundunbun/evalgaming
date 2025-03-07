import { createClient } from '@supabase/supabase-js';


// Replace with your Supabase project URL and anon/public key
const supabaseUrl = 'https://zrvhbridmzncjlwalprt.supabase.co'; // <-- Use your actual Supabase URL here
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmhicmlkbXpuY2psd2FscHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDA1OTgsImV4cCI6MjA1NjQxNjU5OH0.kHsvAS0eNyTQ9K9lhxJsfaya4Uyr_NXWKUDf49jASrQ'; // <-- Use your actual public API key here

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
