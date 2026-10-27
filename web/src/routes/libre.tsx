import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { rango } from '../lib/mock'
import { useStore } from '../lib/store'

export const Route = createFileRoute('/libre')({ component: Libre })

const ACTS = ['Almorzar', 'Estudiar', 'Conversar', 'Deporte', 'Salir']
const DUR = ['30 min', '1 h', '2 h']

function Libre() {
  const { libres, libreHasta, libreAct, setLibre, saludar } = useStore()
  const [dur, setDur] = useState('1 h')
  const toggle = () => {
    if (libreHasta) { setLibre(null); return }
    const d = new Date(Date.now() + (dur === '30 min' ? 30 : dur === '1 h' ? 60 : 120) * 60000)
    setLibre(d.toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' }))
  }
  return (
    <div className="sheet">
      <div className="libre-head">
        <small>ESTOY LIBRE</small>
        <h2>{libreHasta ? `Hasta las ${libreHasta}` : 'Marca tu tiempo libre'}</h2>
      </div>
      <div className="chips">{DUR.map((d) => <button key={d} className={dur === d ? 'on amber' : ''} onClick={() => setDur(d)}>{d}</button>)}</div>
      <div className="chips">{ACTS.map((a) => <button key={a} className={libreAct === a ? 'on' : ''} onClick={() => setLibre(libreHasta, a)}>{a}</button>)}</div>
      <button className="btn amber" style={{ width: '100%' }} onClick={toggle}>{libreHasta ? `Libre (${libreAct}) — pausar` : `Marcarme libre · ${libreAct}`}</button>
      <p className="muted">🔒 Los demás ven {rango(150)}, nunca tu ubicación exacta.</p>
      <h4 style={{ letterSpacing: 2, color: '#0a3556' }}>LIBRES CERCA DE TI</h4>
      {libres.map((l) => (
        <div key={l.id} className="person">
          <div className="avatar" style={{ background: l.color }}>{l.ini}</div>
          <div><b>{l.nombre}</b><div className="muted">{l.act} · {rango(l.distM)}</div></div>
          <button className="btn amber" style={{ marginLeft: 'auto' }} onClick={() => saludar(l.id)}>Saludar</button>
        </div>
      ))}
    </div>
  )
}
