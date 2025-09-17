"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, detectSessionInUrl: true },
});

export default function AuthButton() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session);
        setLoading(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      if (mounted) setSession(sess ?? null);
    });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  if (loading) return null;

  // Niet ingelogd: niks tonen (login zit in hamburger)
  if (!session) return null;

  const user = session.user;
  const isAdmin =
    (typeof window !== "undefined" && (((document.cookie || "").includes("isAdmin=1")) ||
     (function(){ try { return localStorage.getItem("isAdmin") === "1"; } catch { return false; } })())) ||
    user.app_metadata?.role === "admin" || user.user_metadata?.isAdmin === true;

  const avatarUrl = user.user_metadata?.avatar_url || "/avatar.png";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {isAdmin && (
        <Link href="/beheer" style={{ color: "#d6c98b", textDecoration: "none" }}>
          Beheer
        </Link>
      )}
      <Link href="/account">
        <img
          src={avatarUrl}
          alt="Account"
          style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #b8a66a", objectFit: "cover", cursor: "pointer" }}
        />
      </Link>
    </div>
  );
}
