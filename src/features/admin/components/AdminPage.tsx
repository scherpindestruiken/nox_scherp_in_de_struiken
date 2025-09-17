"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function BeheerPage() {
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/login");
      else setReady(true);
    });
  }, [router]);

  if (!ready) return null;

  return (
    <main style={{minHeight:"100vh",background:"#0d1b0d",color:"#d6c98b",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <h1>Welkom in het beheer</h1>
    </main>
  );
}
