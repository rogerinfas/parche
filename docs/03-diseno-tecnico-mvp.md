# 03 — Diseño técnico MVP (50 usuarios)

Objetivo: validar mapa + libre + chat en 6 semanas, costo ~0.

## Stack

- **App:** Flutter (una base iOS/Android). Alternativa: Expo React Native si el equipo ya es React.
- **Backend:** Supabase (Postgres + PostGIS + Auth + Realtime + Storage).
- **Mapa:** MapLibre + OSM / Carto. Sin Google Maps en MVP.
- **Push:** FCM. **Landing:** Vercel + `parche.app`.

Por qué Supabase: auth, RLS, TTL con pg_cron y realtime ya resueltos. No montar backend propio para 50.

## Modelo de datos mínimo

```sql
users(id uuid pk, email_uni text unique, verificado bool, sede text)
profiles(user_id fk, handle text unique, carrera text, intereses text[], bio text)
pins(id uuid, autor fk, tipo text, texto text, geo geography(Point), expira_at timestamptz, activo bool)
availability(user_id fk, actividad text, hasta timestamptz, geo geography(Point), activo bool)
greetings(id uuid, de fk, para fk, estado text, created_at timestamptz) -- pending/accepted/declined/blocked
chats(id uuid, pin_id nullable fk)
messages(id uuid, chat_id fk, de fk, texto text, created_at timestamptz)
reactions(pin_id fk, user_id fk, emoji text)
points(user_id fk, puntos int, dia date)
reports(id uuid, reportero fk, reportado fk / pin_id, motivo text, estado text)
blocks(bloqueador fk, bloqueado fk)
```

Reglas:
- 1 pin activo por usuario. `expira_at` 1-24h. Borrado real con pg_cron, no solo filtro.
- `availability` con `hasta` 30min/1h/2h, auto-off al vencer.
- Chat solo si `greetings.estado = accepted`. Bloqueo cierra y oculta.

## API / RLS (resumen)

- Lectura pines: solo `activo=true AND expira_at>now()` y dentro de radio sede.
- Nunca exponer `geo` exacto al cliente. Vista `pins_public` con `dist_m_redondeada`.
- `availability` visible solo si ambos activos y no bloqueados.
- Escritura: solo dueño. Reportes: insert abierto, lectura solo moderador.

## Ubicación y privacidad (implementación)

- Guardar lat/lng exacto solo en server.
- Exponer rangos: `<100m = "muy cerca"`, sino redondeo a 100m.
- Throttle: actualizar posición máx cada 2 min y solo si se movió >50m.
- Presencia “en línea”: heartbeat 60s por Realtime, no GPS continuo.

## Realtime / Push

- Contador en línea, lista libres cerca, mensajes y reacciones por Realtime.
- Push solo para: saludo recibido/aceptado, mensaje nuevo, reacción a tu pin. Nada más en MVP.

## Estructura app (Flutter)

```
lib/
  features/auth/ mapa/ pines/ libre/ explorar/ chats/ perfil_tarjeta/ puntos/
  core/geo_fuzzy.dart auth_guard.dart supabase_client.dart
```

## Roadmap 6 semanas

1-2: auth correo uni + perfil + tarjeta.
3-4: pines + mapa + Explorar + expiración.
5: libre + saludar (doble opt-in) + chat + report/bloqueo.
6: puntos anti-spam + analítica + hardening privacidad.

## Métricas MVP

DAU/50, % publica pin/semana, % marca libre/semana, tasa aceptación saludo, mensajes por chat, retención D7, # reportes y tiempo de resolución.
