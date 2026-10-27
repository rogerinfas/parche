import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { rango } from '../lib/mock'
import { useStore } from '../lib/store'

export const Route = createFileRoute('/explorar')({ component: Explorar })

function Explorar() {
  const { pines, like } = useStore()
  const [tab, setTab] = useState('Pines')
  const [f, setF] = useState('Todos')
  const list = pines.filter((p) => f === 'Todos' || p.tipo.toLowerCase() === f.toLowerCase())
  return (
    <>
      <div className="topbar"><div className="brand">parche<b>✦</b></div><span className="chip" style={{ marginLeft: 'auto' }}><span className="dot" /> 38 en línea</span></div>
      <div className="seg">
        {['Pines', 'Personas', 'Eventos'].map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
      </div>
      <div className="seg" style={{ marginTop: 8 }}>
        {['Todos', 'Ayuda', 'Plan', 'Estudio'].map((t) => <button key={t} className={f === t ? 'on' : ''} onClick={() => setF(t)} style={f === t ? { background: '#f5a300', borderColor: '#f5a300', color: '#0a3556' } : {}}>{t}</button>)}
      </div>
      <div className="feed">
        {list.map((p) => (
          <div key={p.id} className={`card ${p.tipo === 'ayuda' ? 'green' : ''}`}>
            <div className="meta">
              <div className="avatar" style={{ background: p.color }}>{p.autor.slice(0, 2).toUpperCase()}</div>
              <div><b>{p.autor}</b><div className="muted">hace {p.haceMin} min · {rango(p.distM)}</div></div>
              <span className="chip" style={{ marginLeft: 'auto' }}>{p.expiraH} h</span>
            </div>
            <div className={`tag ${p.tipo === 'ayuda' ? 'green' : ''}`}>{p.tipo.toUpperCase()}</div>
            <h3>{p.texto}</h3>
            <div className="row">
              <button className="btn ghost" onClick={() => like(p.id)}>✦ {p.likes}</button>
              <span className="muted">✉ {p.mensajes}</span>
              <button className="btn" style={{ marginLeft: 'auto' }}>Ver en mapa</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
