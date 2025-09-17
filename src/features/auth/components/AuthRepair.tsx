"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function AuthRepair() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      // 1) Wis alle Supabase auth tokens uit localStorage (sb-*-auth-token)
      const keys = Object.keys(window.localStorage);
      keys.forEach(k => {
        if (/^sb-.*-auth-token$/.test(k)) localStorage.removeItem(k);
      });
    } catch {}
    // 2) Sign out voor de zekerheid
    supabase.auth.signOut().finally(() => {
      setDone(true);
      // 3) Door naar login (of home), vers auth-proces
      window.location.replace("/login");
    });
  }, []);

  return (
    <main style={{minHeight:"60vh",display:"grid",placeItems:"center",color:"#b8a86d",background:"#082616",padding:"24px"}}>
      <div style={{maxWidth:560,textAlign:"center"}}>
        <h1 style={{marginBottom:8}}>Auth repareren…</h1>
        <p style={{opacity:.8}}>
          {done ? "Gereed. Je wordt doorgestuurd naar /login." : "Tokens opschonen en uitloggen…"}
        </p>
      </div>
    </main>
  );
}
