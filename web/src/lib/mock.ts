export type PinTipo = 'ayuda' | 'plan' | 'estudio' | 'evento'
export type Pin = {
  id: string
  autor: string
  handle: string
  color: string
  tipo: PinTipo
  texto: string
  lat: number
  lng: number
  haceMin: number
  expiraH: number
  distM: number
  likes: number
  mensajes: number
}
export type Libre = { id: string; nombre: string; ini: string; color: string; act: string; distM: number }
export type Chat = { id: string; nombre: string; ultimo: string; hora: string; mensajes: { de: string; texto: string }[] }

// Chapinero aprox 4.648, -74.062
export const SEDE = { lat: 4.648, lng: -74.062, nombre: 'Sede Chapinero' }

export const seedPines: Pin[] = [
  { id: 'p1', autor: 'Anónimo', handle: '', color: '#1e7a4c', tipo: 'ayuda', texto: '¿Alguien tiene cargador tipo C?', lat: 4.652, lng: -74.064, haceMin: 25, expiraH: 5, distM: 350, likes: 5, mensajes: 3 },
  { id: 'p2', autor: 'Fútbol', handle: '', color: '#0a3556', tipo: 'plan', texto: 'Fútbol 5 a las 4, faltan 2', lat: 4.649, lng: -74.06, haceMin: 12, expiraH: 4, distM: 400, likes: 8, mensajes: 6 },
  { id: 'p3', autor: 'Estudio', handle: '', color: '#5b3fa8', tipo: 'estudio', texto: 'Repaso de Cálculo en biblioteca', lat: 4.645, lng: -74.065, haceMin: 40, expiraH: 3, distM: 250, likes: 4, mensajes: 2 },
  { id: 'p4', autor: 'Mariana G.', handle: 'MG', color: '#f5a300', tipo: 'evento', texto: 'Feria de frutas en la plaza de Lourdes, ¿quién se anima?', lat: 4.651, lng: -74.058, haceMin: 10, expiraH: 3, distM: 400, likes: 5, mensajes: 3 },
  { id: 'p5', autor: 'Valeria R.', handle: 'VR', color: '#1e7a4c', tipo: 'ayuda', texto: '¿Alguien tiene los apuntes de Cálculo II del martes?', lat: 4.646, lng: -74.063, haceMin: 25, expiraH: 5, distM: 350, likes: 5, mensajes: 3 },
]

export const seedLibres: Libre[] = [
  { id: 'l1', nombre: 'Laura M.', ini: 'LM', color: '#1e7a4c', act: 'Almorzar', distM: 150 },
  { id: 'l2', nombre: 'Santiago P.', ini: 'SP', color: '#5b3fa8', act: 'Estudiar', distM: 300 },
  { id: 'l3', nombre: 'Camila R.', ini: 'CR', color: '#b83a12', act: 'Conversar', distM: 450 },
  { id: 'l4', nombre: 'Juan D.', ini: 'JD', color: '#0a3556', act: 'Deporte', distM: 600 },
]

export const seedChats: Chat[] = [
  { id: 'c1', nombre: 'Laura M.', ultimo: '¿Nos vemos en la entrada?', hora: '12:14', mensajes: [{ de: 'ella', texto: 'Hola! Te vi libre para almorzar' }, { de: 'yo', texto: 'Sí, ¿nos vemos en la entrada?' }] },
  { id: 'c2', nombre: 'Fútbol 5', ultimo: 'Llevo el balón', hora: '11:50', mensajes: [{ de: 'el', texto: 'Faltan 2, ¿te sumas?' }] },
]

export function rango(distM: number) {
  if (distM < 100) return 'muy cerca'
  if (distM < 250) return '~200 m'
  if (distM < 600) return `a ${Math.round(distM / 50) * 50} m`
  return 'a 1 km+'
}
