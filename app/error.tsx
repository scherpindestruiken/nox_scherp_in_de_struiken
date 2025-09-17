"use client";
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <main style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0d1b0d",color:"#d6c98b"}}>
      <div style={{background:"#132313",border:"1px solid rgba(214,201,139,0.25)",borderRadius:12,padding:24,width:640,maxWidth:"90%"}}>
        <h1 style={{marginTop:0}}>Er ging iets mis</h1>
        <pre style={{whiteSpace:"pre-wrap",fontSize:12,opacity:.9}}>{String(error?.message || error)}</pre>
        {error?.digest && <p style={{opacity:.7,fontSize:12}}>Digest: {error.digest}</p>}
        <button onClick={() => reset()} style={{marginTop:12,padding:"8px 12px",borderRadius:8,border:"1px solid rgba(214,201,139,0.35)",background:"#1a2b1a",color:"#d6c98b",cursor:"pointer"}}>Opnieuw proberen</button>
      </div>
    </main>
  );
}
