import { useState } from 'react'
import { SEDE, type PinTipo } from '../lib/mock'
import { useStore } from '../lib/store'

export default function PublishModal({ onClose }: { onClose: () => void }) {
  const { addPin } = useStore()
  const [tipo, setTipo] = useState<PinTipo>('plan')
  const [texto, setTexto] = useState('')
  const [horas, setHoras] = useState(4)
  const colors: Record<PinTipo, string> = { ayuda: '#1e7a4c', plan: '#0a3556', estudio: '#5b3fa8', evento: '#f5a300' }

  const pub = () => {
    if (!texto.trim()) return
    addPin({
      id: `p-${Date.now()}`, autor: 'Tú', handle: '', color: colors[tipo], tipo, texto: texto.trim(),
      lat: SEDE.lat + (Math.random() - 0.5) * 0.008, lng: SEDE.lng + (Math.random() - 0.5) * 0.008,
      haceMin: 0, expiraH: horas, distM: 120, likes: 0, mensajes: 0,
    })
    onClose()
  }
  return (
    <div className="modal" onClick={onClose}>
      <div className="box" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ margin: '4px 0 10px', color: '#0a3556' }}>Publicar un pin</h3>
        <div className="chips">
          {(['ayuda', 'plan', 'estudio', 'evento'] as PinTipo[]).map((t) => (
            <button key={t} className={tipo === t ? 'on' : ''} onClick={() => setTipo(t)}>{t}</button>
          ))}
        </div>
        <textarea rows={3} placeholder="Ej: Fútbol 5 a las 4, faltan 2" value={texto} onChange={(e) => setTexto(e.target.value)} />
        <div className="row" style={{ marginTop: 10 }}>
          <label className="muted">Expira en</label>
          <select value={horas} onChange={(e) => setHoras(Number(e.target.value))}>
            {[1, 2, 4, 8, 12, 24].map((h) => <option key={h} value={h}>{h}h</option>)}
          </select>
        </div>
        <p className="muted">🔒 Solo distancia aproximada. Se borra solo en {horas}h.</p>
        <div className="row">
          <button className="btn ghost" onClick={onClose}>Cancelar</button>
          <button className="btn amber" onClick={pub} style={{ flex: 1 }}>Publicar ✦ +10</button>
        </div>
      </div>
    </div>
  )
}
