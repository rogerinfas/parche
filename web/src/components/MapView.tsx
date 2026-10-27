import { useEffect, useState } from 'react'
import { SEDE, rango, type Pin } from '../lib/mock'

export default function MapView({ pines }: { pines: Pin[] }) {
  const [ready, setReady] = useState(false)
  const [Leaf, setLeaf] = useState<any>(null)
  useEffect(() => {
    setReady(true)
    Promise.all([import('react-leaflet'), import('leaflet')]).then(([rl, L]) => setLeaf({ ...rl, L }))
  }, [])
  if (!ready || !Leaf) return <div className="mapwrap"><div style={{ height: 520, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando mapa…</div></div>
  const { MapContainer, TileLayer, Marker, Popup } = Leaf
  const L = Leaf.L
  return (
    <div className="mapwrap">
      <MapContainer center={[SEDE.lat, SEDE.lng]} zoom={15} style={{ height: 520, width: '100%' }} zoomControl={false}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution="© OpenStreetMap © CARTO" />
        {pines.map((p) => {
          const icon = L.divIcon({
            className: '',
            html: `<div><div class="pin-bubble">${p.texto}</div><div class="pin-dot" style="background:${p.color}"><span>✦</span></div></div>`,
            iconSize: [150, 90],
            iconAnchor: [75, 80],
          })
          return (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
              <Popup>
                <b>{p.texto}</b>
                <br />{rango(p.distM)} · expira en {p.expiraH}h · ✦ {p.likes}
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
