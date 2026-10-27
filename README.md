# Parche ✦ — Tu universidad, ahora y cerca

Red social solo para estudiantes La Salle en Colombia.
Mapa en vivo + `Estoy libre` + pines efímeros + tarjeta compartible.

> Estado: **MVP web móvil funcional** en `web/` + docs. Piloto: 50 estudiantes · Bogotá.
> Stack: TanStack Start fullstack (front + back) + Postgres dockerizada.

## Qué es

Parche muestra lo que pasa cerca de tu sede, ahora:
sin grupos de WhatsApp que no avisan, sin redes abiertas donde no sabes quién es estudiante.

## App web móvil (`web/`)

TanStack Start: `/` mapa, `/explorar`, `/libre`, `/chats`, `/perfil` + publicar pin.

```bash
cd web
npm install
docker compose up -d
cp .env.example .env
npm run dev
```

## Docs

- `docs/01-propuesta.md` — resumen fiel de la presentación del piloto (6 slides + 4 mockups)
- `docs/02-evaluacion.md` — qué funciona, riesgos críticos y qué falta
- `docs/03-diseno-tecnico-mvp.md` — stack, modelo de datos y reglas para el MVP de 50
- `docs/04-plan-piloto.md` — alcance, métricas, guía de entrevista e historia de uso
- `docs/05-privacidad-legal.md` — privacidad, seguridad y Ley 1581

## Principios del piloto

1. Solo estudiantes verificados (correo universitario).
2. Nunca se expone ubicación exacta, solo distancia aproximada.
3. Todo expira en 1-24h y se borra en backend.
4. Control total: reportar / bloquear en un toque.

## Roadmap

1. Piloto: 50 estudiantes, feedback.
2. Lanzamiento Bogotá: Chapinero, Candelaria y Norte con embajadores por carrera.
3. Toda la red: Yopal y Unilasallista con Bienestar.

---
José Luis H. V. · Bogotá, octubre 2026
