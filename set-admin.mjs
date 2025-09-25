import { createClient } from '@supabase/supabase-js';

const email = 'josebennink@protonmail.com';
const password = '7Sprongen!'; // kies zelf een veilig wachtwoord

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

(async () => {
  // maak of update user
  const { data: user, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: 'admin' },
    app_metadata: { role: 'admin' }
  });

  if (error) {
    console.error('❌ Fout bij aanmaken/updaten user:', error);
    process.exit(1);
  }

  console.log('✅ Admin user actief:', user.user.email, 'id:', user.user.id);
})();
