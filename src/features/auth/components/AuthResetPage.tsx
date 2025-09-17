"use client";
import { useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function AuthReset() {
  useEffect(() => {
    (async () => {
      try { await supabase.auth.signOut(); } catch {}
      try { localStorage.clear(); sessionStorage.clear(); } catch {}
      location.replace("/login");
    })();
  }, []);
  return null;
}
