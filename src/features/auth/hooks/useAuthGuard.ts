"use client";
import { useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";

export function useAuthGuard() {
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      // Als supabase meldt dat je signed_out bent of refresh faalt, zorg dat je storage clean is
      if (event === "SIGNED_OUT" || (!session && event === "TOKEN_REFRESHED")) {
        try {
          Object.keys(localStorage).forEach(k => {
            if (/^sb-.*-auth-token$/.test(k)) localStorage.removeItem(k);
          });
        } catch {}
      }
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);
}
