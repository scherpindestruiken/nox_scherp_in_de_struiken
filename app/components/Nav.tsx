"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  { auth: { persistSession: true, detectSessionInUrl: true } }
);

// Allowlist: deze mails zijn altijd admin
const ADMIN_EMAILS = new Set<string>(["josebennink@protonmail.com"]);

function isAdminFromCookie() {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith("isAdmin=1"));
}
function isAdminFromStorage() {
  if (typeof window === "undefined") return false;
  try { return window.localStorage.getItem("isAdmin") === "1"; } catch { return false; }
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const emailRef = useRef<string>("");

  useEffect(() => {
    let mounted = true;

    const compute = async () => {
      let logged = false;
      let admin = false;
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          logged = true;
          const user: any = session.user;
          emailRef.current = user?.email ?? "";
          admin =
            ADMIN_EMAILS.has(emailRef.current) ||
            user?.app_metadata?.role === "admin" ||
            user?.user_metadata?.isAdmin === true;
        }
      } catch {}
      if (!admin) admin = isAdminFromCookie() || isAdminFromStorage();

      if (mounted) { setIsLogged(logged); setIsAdmin(admin); }
    };

    compute();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, sess) => {
      const logged = !!sess;
      const user: any = sess?.user;
      emailRef.current = user?.email ?? "";
      const admin =
        ADMIN_EMAILS.has(emailRef.current) ||
        user?.app_metadata?.role === "admin" ||
        user?.user_metadata?.isAdmin === true ||
        isAdminFromCookie() || isAdminFromStorage();

      setIsLogged(logged);
      setIsAdmin(!!admin);
    });

    return () => { mounted = false; sub.subscription?.unsubscribe?.(); };
  }, []);

  function toggleMenu() { setMenuOpen((v) => !v); }

  async function logoutLocal() {
    try { await supabase.auth.signOut(); } catch {}
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || "";
        if (k.startsWith("sb-") && k.endsWith("-auth-token")) { localStorage.removeItem(k); i--; }
      }
    } catch {}
    document.cookie = "isAdmin=; Path=/; Max-Age=0; SameSite=Lax";
    try { localStorage.removeItem("isAdmin"); } catch {}
    location.reload();
  }

  return (
    <>
      {/* Topbar */}
      <nav
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 40px", background: "transparent", zIndex: 999
        }}
        aria-label="Hoofdnavigatie"
      >
        <button
          aria-label="Menu openen/sluiten"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            width: 40, height: 40, display: "inline-flex", alignItems: "center", justifyContent: "center", visibility: "visible"
          }}
        >
          <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="28" height="2" fill="#d6c98b"></rect>
            <rect x="0" y="10" width="28" height="2" fill="#d6c98b"></rect>
            <rect x="0" y="20" width="28" height="2" fill="#d6c98b"></rect>
          </svg>
        </button>

        <h1 style={{ margin: 0, flex: 1, textAlign: "center", color: "#d6c98b" }}>
          <span style={{fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700}}>Scherp in de Struiken</span>
        </h1>

        <div style={{ width: 64 }} />
      </nav>

      {/* Hamburger: compact, geen overlay */}
      <aside
        aria-hidden={!menuOpen}
        style={{
          position: "absolute",
          top: 56, left: 0,
          width: "max-content",
          background: "#0d1b0d",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform .25s ease",
          zIndex: 1001,
          borderRight: "1px solid rgba(184,166,106,0.25)",
          color: "#b8a66a",
          padding: 16, maxHeight: "calc(100vh - 80px)", overflowY: "auto", borderRadius: 12
        }}
      >
        <div style={{ padding: 16 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: "1.1rem", color: "#b8a66a" }}></h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ margin: "10px 0" }}><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li style={{ margin: "10px 0" }}><Link href="/blog" onClick={() => setMenuOpen(false)}>Nox' Blog</Link></li>
            <li style={{ margin: "10px 0" }}><Link href="/fotos" onClick={() => setMenuOpen(false)}>Nox' Foto’s</Link></li>
            <li style={{ margin: "10px 0" }}><Link href="/competitie" onClick={() => setMenuOpen(false)}>Nox' Competitie</Link></li>
            <li style={{ margin: "10px 0" }}><Link href="/puzzelen" onClick={() => setMenuOpen(false)}>Puzzelen met Nox</Link></li>
            <li style={{ margin: "10px 0" }}><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            {(isAdmin || ADMIN_EMAILS.has(emailRef.current)) && (
              <li style={{ margin: "10px 0" }}>
                <Link href="/beheer" onClick={() => setMenuOpen(false)} style={{ fontWeight: 600 }}>
                  Beheer
                </Link>
              </li>
            )}
            {!isLogged ? (
              <li style={{ margin: "32px 0 0" }}>
                <Link href="/login" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </li>
            ) : (
              <li style={{ margin: "32px 0 0" }}>
                <button
                  onClick={logoutLocal}
                  style={{ background: "transparent", border: "1px solid rgba(184,166,106,0.4)", color: "#d6c98b", padding: "6px 10px", borderRadius: 8, cursor: "pointer" }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
}
