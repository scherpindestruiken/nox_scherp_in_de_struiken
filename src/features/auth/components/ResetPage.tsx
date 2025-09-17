"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function ResetPage() {
  const [stage, setStage] = useState<"request"|"update">("request");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (hash.includes("type=recovery") || hash.includes("access_token")) setStage("update");
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setStage("update");
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  const requestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== "undefined" ? `${window.location.origin}/reset` : undefined
    });
    setLoading(false);
    setMsg(error ? `Versturen mislukt: ${error.message}` : "E-mail verstuurd. Check je inbox en klik op de link.");
  };

  const updatePwd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg("");
    const { error } = await supabase.auth.updateUser({ password: pwd });
    if (!error) {
      // Zorg dat de sessie schoon is en geef een duidelijke melding
      await supabase.auth.signOut().catch(() => {});
      setMsg("Wachtwoord gewijzigd en je bent uitgelogd. Je kunt nu opnieuw inloggen met je nieuwe wachtwoord.");
      setTimeout(() => { window.location.href = "/login"; }, 2000);
    } else {
      setMsg(`Wijzigen mislukt: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <main style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0d1b0d"}}>
      <form onSubmit={stage==="request"?requestReset:updatePwd}
        style={{background:"#132313",border:"1px solid rgba(214,201,139,0.25)",borderRadius:12,padding:24,width:360,boxShadow:"0 10px 30px rgba(0,0,0,0.35)"}}>
        <h1 style={{marginTop:0,marginBottom:16,color:"#d6c98b",textAlign:"center"}}>
          {stage==="request" ? "Wachtwoord resetten" : "Nieuw wachtwoord instellen"}
        </h1>

        {stage==="request" ? (
          <>
            <label style={{display:"block",color:"#f5f5f5",marginBottom:8}}>Email</label>
            <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}
              style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid #2a3a2a",background:"#0d1b0d",color:"#f5f5f5"}}/>
            <button type="submit" disabled={loading}
              style={{marginTop:12,width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid rgba(214,201,139,0.35)",background:"#1a2b1a",color:"#d6c98b",cursor:"pointer",opacity:loading?0.7:1}}>
              {loading ? "Versturen..." : "Stuur resetlink"}
            </button>
          </>
        ) : (
          <>
            <label style={{display:"block",color:"#f5f5f5",marginBottom:8}}>Nieuw wachtwoord</label>
            <input type="password" required minLength={6} value={pwd} onChange={(e)=>setPwd(e.target.value)}
              style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid #2a3a2a",background:"#0d1b0d",color:"#f5f5f5"}}/>
            <button type="submit" disabled={loading}
              style={{marginTop:12,width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid rgba(214,201,139,0.35)",background:"#1a2b1a",color:"#d6c98b",cursor:"pointer",opacity:loading?0.7:1}}>
              {loading ? "Opslaan..." : "Wachtwoord opslaan"}
            </button>
          </>
        )}

        {msg && <p style={{marginTop:12,color:"#d6c98b",textAlign:"center"}}>{msg}</p>}
      </form>
    </main>
  );
}
