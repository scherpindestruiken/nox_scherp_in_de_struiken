"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Minimalistische login die pas *tijdens klik* Supabase importeert.
 * Dit voorkomt white screens door module/SSR crashes bij initial load.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const { supabase } = await import("../../../lib/supabaseClient");
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg(error.message || "Inloggen mislukt");
      else router.replace("/");
    } catch (err: any) {
      setMsg(String(err?.message ?? err));
      console.error("Login exception:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0d1b0d"}}>
      <form onSubmit={onSubmit} style={{background:"#132313",border:"1px solid rgba(214,201,139,0.25)",borderRadius:12,padding:24,width:360,boxShadow:"0 10px 30px rgba(0,0,0,0.35)"}}>
        <h1 style={{marginTop:0,marginBottom:16,color:"#d6c98b",textAlign:"center"}}>Login</h1>

        <label style={{display:"block",color:"#f5f5f5",marginBottom:8}}>Email</label>
        <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}
          style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid #2a3a2a",background:"#0d1b0d",color:"#f5f5f5",marginBottom:12}}/>

        <label style={{display:"block",color:"#f5f5f5",marginBottom:8}}>Wachtwoord</label>
        <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}
          style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid #2a3a2a",background:"#0d1b0d",color:"#f5f5f5"}}/>

        <button type="submit" disabled={loading}
          style={{marginTop:12,width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid rgba(214,201,139,0.35)",background:"#1a2b1a",color:"#d6c98b",cursor:"pointer",opacity:loading?0.7:1}}>
          {loading ? "Bezig..." : "Inloggen"}
        </button>

        {msg && <p style={{marginTop:12,color:"#ffb4b4",textAlign:"center"}}>{msg}</p>}

        <p style={{marginTop:12,fontSize:"0.9rem",textAlign:"center"}}>
          Nog geen account? <a href="/signup" style={{color:"#d6c98b"}}>Registreren</a>
        </p>
        <p style={{marginTop:8,fontSize:"0.9rem",textAlign:"center"}}>
          <a href="/reset" style={{color:"#d6c98b"}}>Wachtwoord vergeten?</a>
        </p>
      </form>
    </main>
  );
}
