import { createContext, useContext, useEffect, useState } from 'react'
import { seedChats, seedLibres, seedPines, type Chat, type Libre, type Pin } from './mock'

type Store = {
  pines: Pin[]
  libres: Libre[]
  chats: Chat[]
  puntos: number
  enLinea: number
  libreHasta: string | null
  libreAct: string
  setLibre: (hasta: string | null, act?: string) => void
  addPin: (p: Pin) => void
  like: (id: string) => void
  saludar: (id: string) => void
  send: (chatId: string, texto: string) => void
  addPoints: (n: number) => void
}

const Ctx = createContext<Store>(null as any)
const K = 'parche-mvp-v1'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [pines, setPines] = useState<Pin[]>(seedPines)
  const [libres] = useState<Libre[]>(seedLibres)
  const [chats, setChats] = useState<Chat[]>(seedChats)
  const [puntos, setPuntos] = useState(120)
  const [libreHasta, setLibreHasta] = useState<string | null>(null)
  const [libreAct, setLibreAct] = useState('Almorzar')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(K)
      if (raw) {
        const j = JSON.parse(raw)
        if (j.pines) setPines(j.pines)
        if (j.chats) setChats(j.chats)
        if (typeof j.puntos === 'number') setPuntos(j.puntos)
        if (j.libreHasta) setLibreHasta(j.libreHasta)
      }
    } catch {}
  }, [])
  useEffect(() => {
    try { localStorage.setItem(K, JSON.stringify({ pines, chats, puntos, libreHasta })) } catch {}
  }, [pines, chats, puntos, libreHasta])

  const addPin: Store['addPin'] = (p) => { setPines((s) => [p, ...s]); setPuntos((x) => x + 10) }
  const like = (id: string) => setPines((s) => s.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)))
  const saludar = (id: string) => {
    const l = libres.find((x) => x.id === id)
    if (!l) return
    setChats((s) => (s.some((c) => c.nombre === l.nombre) ? s : [{ id: `c-${Date.now()}`, nombre: l.nombre, ultimo: `Hola ${l.nombre.split(' ')[0]}!`, hora: 'ahora', mensajes: [{ de: 'yo', texto: `Hola! Te vi libre para ${l.act.toLowerCase()}` }] }, ...s]))
    setPuntos((x) => x + 5)
  }
  const send = (chatId: string, texto: string) => {
    setChats((s) => s.map((c) => (c.id === chatId ? { ...c, ultimo: texto, mensajes: [...c.mensajes, { de: 'yo', texto }] } : c)))
  }
  const setLibre: Store['setLibre'] = (hasta, act) => { setLibreHasta(hasta); if (act) setLibreAct(act) }
  const addPoints = (n: number) => setPuntos((x) => x + n)

  return <Ctx.Provider value={{ pines, libres, chats, puntos, enLinea: 38, libreHasta, libreAct, setLibre, addPin, like, saludar, send, addPoints }}>{children}</Ctx.Provider>
}

export const useStore = () => useContext(Ctx)
