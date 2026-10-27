import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import MapView from '../components/MapView'
import PublishModal from '../components/PublishModal'
import { useStore } from '../lib/store'

export const Route = createFileRoute('/')({ component: Mapa })

function Mapa() {
  const { pines, puntos, enLinea } = useStore()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setOpen(true)
    window.addEventListener('parche:publicar', fn)
    return () => window.removeEventListener('parche:publicar', fn)
  }, [])
  return (
    <>
      <div className="topbar">
        <div className="brand">parche<b>✦</b></div>
        <div className="pill">
          <span className="chip amber">✦ {puntos}</span>
          <span className="chip"><span className="dot" /> {enLinea} en línea</span>
        </div>
      </div>
      <div className="seg">
        <button className="on">Sede Chapinero ▾</button>
        <button>Toda la red</button>
      </div>
      <MapView pines={pines} />
      <div className="statrow">
        <Link to="/libre" className="stat navy" style={{ textDecoration: 'none' }}><small>LIBRES CERCA</small>6 libres →</Link>
        <div className="stat amber"><small>TOP DE HOY</small>@andres.m</div>
      </div>
      <p className="muted" style={{ padding: '0 14px' }}>Front + back en TanStack Start. API: server functions. DB: Postgres dockerizada.</p>
      {open && <PublishModal onClose={() => setOpen(false)} />}
    </>
  )
}
