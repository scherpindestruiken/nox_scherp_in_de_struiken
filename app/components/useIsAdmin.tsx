"use client";
import { useEffect, useState } from "react";

/**
 * Robuuste admin-check:
 * - Haalt user e-mail op via supabase.auth.getUser()
 * - Luistert naar onAuthStateChange om updates direct te verwerken
 * - Vergelijkt met whitelist (NEXT_PUBLIC_ADMIN_EMAILS + hardcoded beheerder)
 */
export default function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    let unsub: any;

    const allowList = new Set<string>([
      "josebennink@protonmail.com",
      ...(process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean),
    ]);

    async function evalAdmin() {
      try {
        const { supabase } = await import("../../src/lib/supabaseClient");
        const { data } = await supabase.auth.getUser();
        const email = data.user?.email?.toLowerCase() || "";
        if (!mounted) return;
        setIsAdmin(Boolean(email && allowList.has(email)));
      } catch {
        if (!mounted) return;
        setIsAdmin(false);
      }
    }

    (async () => {
      await evalAdmin();
      try {
        const { supabase } = await import("../../src/lib/supabaseClient");
        const sub = supabase.auth.onAuthStateChange(() => evalAdmin());
        unsub = sub.data?.subscription;
      } catch {
        // negeer
      }
    })();

    return () => {
      mounted = false;
      try { unsub?.unsubscribe?.(); } catch {}
    };
  }, []);

  return isAdmin;
}
