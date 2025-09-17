"use client";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Nox’ Blog" },
  { href: "/fotos", label: "Nox’ Foto’s" },
  { href: "/competitie", label: "Nox’ Competitie" },
  { href: "/puzzelen", label: "Puzzelen met Nox" },
  { href: "/contact", label: "Contact" },
  { href: "/qr", label: "QR-code" },
  { href: "/installeer", label: "Installeer" }
];

export default function HamburgerNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 12, right: 12, zIndex: 1000
    }} aria-label="Hoofdnavigatie">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="menu"
        style={{
          width: 44, height: 44, borderRadius: 10,
          background: "#1a2b1a", color: "#d6c98b",
          border: "1px solid rgba(214,201,139,0.35)",
          cursor: "pointer"
        }}
      >
        ☰
      </button>

      {open && (
        <div
          id="menu"
          role="menu"
          style={{
            position: "absolute", top: 52, right: 0,
            background: "#0d1b0d", color: "#f5f5f5",
            border: "1px solid rgba(214,201,139,0.25)",
            borderRadius: 12, padding: 8, minWidth: 220,
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "10px 12px",
                textDecoration: "none",
                color: "#f5f5f5",
                borderRadius: 8
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(214,201,139,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
