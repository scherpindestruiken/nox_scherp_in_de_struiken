import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// voorbeeld: lijst alle users op
(async () => {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;
    console.log("✅ Users:", data);
  } catch (err) {
    console.error("❌ Fout:", err);
  }
})();
