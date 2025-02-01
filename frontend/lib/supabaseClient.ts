import { createClient } from "@supabase/supabase-js" ;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? (() => { 
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable"); 
  })();
  
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? (() => { 
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable"); 
  })();

export const supabase = createClient( supabaseUrl , supabaseAnonKey);
