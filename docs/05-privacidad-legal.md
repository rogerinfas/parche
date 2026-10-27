# 05 — Privacidad y legal (Colombia)

## Principios

- Minimización: solo correo uni, carrera/sede, geo temporal.
- Geo es dato sensible. Consentimiento explícito + finalidad “mostrar cercanía aproximada”.
- “Se borra solo” = borrado real en DB + Storage, con job verificable, no soft-delete.

## Controles MVP

- Distancia por rangos, throttle de updates, modo invisible.
- Doble opt-in para chat, límite de saludos, bloqueo en 1 toque que cierra chat y oculta perfil.
- Links de tarjeta con expiración, sin sede exacta pública.
- Log de accesos a reportes solo para moderador.

## Ley 1581 Habeas Data (resumen operativo)

- Aviso + autorización previa, política de tratamiento publicada en `parche.app/privacidad`.
- Derechos de acceso, rectificación, supresión. Contacto del responsable.
- No tratar datos de menores sin autorización reforzada (validar si hay menores en La Salle).
- Transferencia: si Supabase/hosting está fuera de CO, informar transferencia internacional.
- Reporte de incidentes y respuesta <24h en piloto.

> Esto no es asesoría legal. Validar con asesoría de la universidad antes del piloto.
