import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY);
(async () => {
  const { data, error } = await supabase.from('messages').select().limit(5);
  console.log('data:', data, 'error:', error);
})();
