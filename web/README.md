# Parche web — TanStack Start fullstack (móvil)

Front + back en el mismo lugar. DB Postgres dockerizada.

## Dev

```bash
cd web
npm install
docker compose up -d        # Postgres 16 + PostGIS en :5432
cp .env.example .env         # DATABASE_URL=postgres://parche:parche@localhost:5432/parche
npm run dev                  # http://localhost:3000
```

Sin `DATABASE_URL` la app usa mocks (útil para UI).

## Estructura

- `src/routes/` — `/` mapa, `/explorar`, `/libre`, `/chats`, `/perfil` (file-based, TanStack Router)
- `src/components/` — `MapView` (Leaflet + OSM/Carto, solo cliente), `PublishModal`
- `src/lib/store.tsx` — estado + localStorage (pines, chats, puntos, libre)
- `src/lib/server.ts` — `createServerFn` (back en el mismo repo)
- `src/db/schema.ts` — Drizzle: users, profiles, pins, availability, greetings, chats, messages, points
- `docker-compose.yml` — `db` PostGIS

## API (server functions)

- `listPines()` GET — DB si hay `DATABASE_URL`, si no mock
- `health()` GET — `{ ok, db, ts }`

## Mapa

Leaflet + Carto Light. Pines como `divIcon` con el estilo del mockup. Geo exacta solo en server; al cliente solo distancia por rangos (`src/lib/mock.ts#rango`).
