"use client";
import React, { useState } from "react";
import Link from "next/link";

/** Schone, klikbare topbar zonder z-index drama. */
export default function Topbar() {
  const [open, setOpen] = useState(false);
  const headerH = 56;

  return (
    <header
      role="banner"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 3000,               // boven alles
        height: headerH,
        display: "grid",
        gridTemplateColumns: "40px 1fr 40px",
        alignItems: "center",
        gap: 12,
        padding: "8px 16px",
        background: "#0d1b0d",
        borderBottom: "1px solid rgba(184,168,109,.25)",
      }}
    >
      {/* Hamburger */}
      <button
        type="button"
        aria-label="Menu openen/sluiten"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        style={{
          width: 40, height: 40, display: "inline-flex",
          alignItems: "center", justifyContent: "center",
          background: "transparent", border: 0, cursor: "pointer",
          position: "relative", zIndex: 4000,  // gegarandeerd klikbaar
        }}
      >
        <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="0" y="0" width="28" height="2" fill="#d6c98b"></rect>
          <rect x="0" y="10" width="28" height="2" fill="#d6c98b"></rect>
          <rect x="0" y="20" width="28" height="2" fill="#d6c98b"></rect>
        </svg>
      </button>

      {/* Titel */}
      <h1 style={{ margin: 0, textAlign: "center", color: "#b8a86d", lineHeight: 1 }}>
        <span style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, whiteSpace: "nowrap" }}>
          Scherp in de Struiken
        </span>
      </h1>

      {/* Avatar-slot rechts (later vervangen door echte avatar) */}
      <div
        aria-hidden="true"
        style={{
          justifySelf: "end",
          width: 40, height: 40, borderRadius: "50%",
          background: "rgba(184,168,109,.25)",
          boxShadow: "0 0 0 1px rgba(184,168,109,.30) inset",
        }}
      />

      {/* Menu: alleen renderen als open = true -> niets blokkeert de header wanneer dicht */}
      {open && (
        <aside
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            top: headerH, left: 0,
            zIndex: 3500,
            width: "min(86vw, 340px)",
            maxHeight: `calc(100vh - ${headerH}px)`,
            overflowY: "auto",
            background: "#0d1b0d",
            borderRight: "1px solid rgba(184,166,106,0.25)",
            boxShadow: "0 12px 24px rgba(0,0,0,.35)",
            color: "#b8a66a",
            padding: 16,
            transform: "translateX(0)",
            transition: "transform .25s ease",
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          }}
        >
          <nav aria-label="Hoofdmenu">
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ margin: "10px 0" }}><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
              <li style={{ margin: "10px 0" }}><Link href="/blog" onClick={() => setOpen(false)}>Nox' Blog</Link></li>
              <li style={{ margin: "10px 0" }}><Link href="/fotos" onClick={() => setOpen(false)}>Nox’ Foto’s</Link></li>
              <li style={{ margin: "10px 0" }}><Link href="/competitie" onClick={() => setOpen(false)}>Nox' Competitie</Link></li>
              <li style={{ margin: "10px 0" }}><Link href="/puzzelen" onClick={() => setOpen(false)}>Puzzelen met Nox</Link></li>
              <li style={{ margin: "10px 0" }}><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
            </ul>
          </nav>
        </aside>
      )}
    </header>
  );
}
