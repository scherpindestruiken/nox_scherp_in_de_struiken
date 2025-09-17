"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("✅ Service Worker geregistreerd"))
        .catch((err) => console.error("❌ SW fout:", err));
    }
  }, []);

  return null;
}
