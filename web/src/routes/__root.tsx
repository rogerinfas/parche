import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import 'leaflet/dist/leaflet.css'
import { StoreProvider } from '../lib/store'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#0A3556' },
      { name: 'description', content: 'Parche — Tu universidad, ahora y cerca. Red solo para La Salle.' },
      { title: 'Parche ✦ — Tu universidad, ahora y cerca' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'icon', href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>" },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const publicar = () => window.dispatchEvent(new CustomEvent('parche:publicar'))
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        <StoreProvider>
          <div className="phone">
            <div className="screen">{children}</div>
            <nav className="tabbar">
              <Tab to="/" label="Mapa" icon="◎" />
              <Tab to="/explorar" label="Explorar" icon="☰" />
              <button className="fab" aria-label="Publicar" onClick={publicar}>+</button>
              <Tab to="/chats" label="Chats" icon="✉" />
              <Tab to="/perfil" label="Perfil" icon="☺" />
            </nav>
          </div>
        </StoreProvider>
        <Scripts />
      </body>
    </html>
  )
}

function Tab({ to, label, icon }: { to: string; label: string; icon: string }) {
  return (
    <Link to={to} className="tab" activeProps={{ className: 'tab active' }}>
      <span className="tab-icon">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}
