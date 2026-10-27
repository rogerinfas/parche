import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useStore } from '../lib/store'

export const Route = createFileRoute('/chats')({ component: Chats })

function Chats() {
  const { chats, send } = useStore()
  const [sel, setSel] = useState(chats[0]?.id)
  const [txt, setTxt] = useState('')
  const c = chats.find((x) => x.id === sel)
  return (
    <div className="sheet">
      <h3 style={{ color: '#0a3556', margin: 0 }}>Chats</h3>
      <p className="muted">Solo puedes chatear si el saludo fue aceptado. Reporta/bloquea en 1 toque.</p>
      <div className="chips">{chats.map((x) => <button key={x.id} className={sel === x.id ? 'on' : ''} onClick={() => setSel(x.id)}>{x.nombre}</button>)}</div>
      {c && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '10px 0' }}>
            {c.mensajes.map((m, i) => (
              <div key={i} style={{ alignSelf: m.de === 'yo' ? 'flex-end' : 'flex-start', background: m.de === 'yo' ? '#0a3556' : '#fff', color: m.de === 'yo' ? '#fff' : '#0a3556', border: '1px solid #f0e4cf', padding: '8px 12px', borderRadius: 14 }}>{m.texto}</div>
            ))}
          </div>
          <div className="row">
            <input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Escribe…" onKeyDown={(e) => { if (e.key === 'Enter' && txt.trim()) { send(c.id, txt.trim()); setTxt('') } }} />
            <button className="btn amber" onClick={() => { if (txt.trim()) { send(c.id, txt.trim()); setTxt('') } }}>→</button>
          </div>
        </>
      )}
    </div>
  )
}
