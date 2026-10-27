import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '../lib/store'
import { health } from '../lib/server'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/perfil')({ component: Perfil })

function Perfil() {
  const { puntos } = useStore()
  const [st, setSt] = useState<any>(null)
  useEffect(() => { health().then(setSt).catch(() => {}) }, [])
  const share = async () => {
    const data = { title: 'Parche', text: 'Conecta en Parche — @vale.r', url: location.href }
    try { if (navigator.share) await navigator.share(data); else await navigator.clipboard.writeText(data.url) ; alert('¡Tarjeta copiada!') } catch {}
  }
  return (
    <>
      <div className="topbar"><span className="muted" style={{ letterSpacing: 2, fontWeight: 900 }}>TU TARJETA</span></div>
      <div className="tarjeta">
        <div className="cover"><div className="brand" style={{ color: '#fff' }}>parche<b style={{ color: '#f5a300' }}>✦</b></div><h1 style={{ fontSize: 72, margin: '10px 0' }}>VR</h1><span className="chip amber">✦ Estudiante La Salle</span></div>
        <h2>Rodríguez V. <span style={{ color: '#b98a00', fontSize: 18 }}>@vale.r</span></h2>
        <p className="muted" style={{ margin: '0 12px' }}>Ingeniería Ambiental · Sede Norte · ✦ {puntos} pts</p>
        <div className="chips" style={{ padding: '0 12px' }}><button className="on">Running</button><button className="on">Fotografía</button><button className="on">Café</button></div>
        <p style={{ margin: '0 12px 12px' }}>Siempre lista para un tinto entre clases.</p>
      </div>
      <div style={{ padding: '0 12px' }}>
        <button className="btn amber" style={{ width: '100%' }} onClick={share}>COMPARTIR PERFIL</button>
        <p className="muted">Back + front en el mismo TanStack Start. {st ? `API: ok · DB: ${st.db ? 'conectada' : 'mock (sin DATABASE_URL)'}` : 'Conectando API…'}</p>
        <p className="muted">DB docker: <code>cd web && docker compose up -d</code> con <code>DATABASE_URL=postgres://parche:parche@localhost:5432/parche</code></p>
      </div>
    </>
  )
}
