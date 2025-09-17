import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anon) {
  // Laat het hard falen in build zodat je niet met een halve setup live gaat
  throw new Error("Supabase env ontbreekt: zet NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY.");
}

// Eenvoudige singleton client; werkt in SSR/Edge en browser.
// Geen custom storage, supabase-js regelt dat zelf waar nodig.
export const supabase = createClient(url, anon);
