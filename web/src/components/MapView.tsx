import { useEffect, useRef, useState } from 'react'
import { SEDE, rango, type Pin } from '../lib/mock'

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export default function MapView({ pines }: { pines: Pin[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [err, setErr] = useState<string | null>(null)
  const ids = pines.map((p) => p.id).join(',')

  useEffect(() => {
    let cancelled = false
    let map: any = null
    setErr(null)
    import('leaflet')
      .then((L) => {
        if (cancelled || !ref.current) return
        map = L.map(ref.current, { zoomControl: false }).setView([SEDE.lat, SEDE.lng], 15)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map)
        pines.forEach((p) => {
          const icon = L.divIcon({
            className: '',
            html: `<div><div class="pin-bubble">${esc(p.texto)}</div><div class="pin-dot" style="background:${p.color}"><span>✦</span></div></div>`,
            iconSize: [150, 90],
            iconAnchor: [75, 80],
          })
          L.marker([p.lat, p.lng], { icon })
            .addTo(map)
            .bindPopup(`<b>${esc(p.texto)}</b><br/>${rango(p.distM)} · expira en ${p.expiraH}h · ✦ ${p.likes}`)
        })
        setTimeout(() => { try { map.invalidateSize() } catch {} }, 150)
      })
      .catch(() => {
        if (!cancelled) setErr('No se pudo cargar el mapa. Revisa tu conexión y recarga.')
      })
    return () => {
      cancelled = true
      try { map?.remove() } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids])

  return (
    <div className="mapwrap">
      <div ref={ref} style={{ height: 520, width: '100%' }} />
      {err && <div style={{ padding: 12, color: '#b83a12', fontWeight: 700 }}>{err}</div>}
    </div>
  )
}
