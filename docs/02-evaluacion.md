# 02 — Evaluación

## Qué funciona

- Problema verificable: fragmentación por sedes + WhatsApp no resuelve presencia.
- Propuesta diferenciada: hiperlocal + efímero + verificado.
- Alcance piloto correcto: 50, una ciudad, feedback antes de escalar.
- Narrativa concreta + guía de entrevista incluida (buen discovery).

## Riesgos críticos

### 1. Cold start / densidad
50 usuarios en 3 sedes = ~16 por sede. Probabilidad de coincidir en tiempo+radio 500m es baja.
Mapa vacío mata la primera impresión.
Mitigación: franjas sincronizadas (12-2pm), eventos semilla, embajadores que publican 2-3 pines/día.

### 2. Privacidad por distancia
Mostrar “a 150m” en tiempo real permite triangulación con 2-3 lecturas.
Más el contexto (carrera, foto, actividad) identifica.
Mitigación obligatoria en MVP:
- redondear a rangos (muy cerca <100m, ~200m, ~500m, 1km+)
- no actualizar más de 1 vez / 2-5 min
- modo invisible / pausar libre
- no mostrar distancia + dirección a la vez

### 3. Verificación
Solo “correo universitario” sin validar dominio + matrícula es falsificable.
Definir allowlist: `@lasalle.edu.co`, `@unisalle.edu.co`, etc. + enlace mágico + revisión manual en piloto.

### 4. Seguridad en “Saludar + chat”
Chat 1-1 entre desconocidos = riesgo de acoso/spam.
Falta: doble opt-in, límite 5/día, plantillas de saludo, bloqueo que cierra chat, revisión de reportes <24h.

### 5. Contradicción “cerrado pero compartible”
Tarjeta para IG/WhatsApp expone perfiles fuera de la red verificada.
MVP: tarjeta con QR solo visible dentro de la app + link con expiración, sin exponer sede exacta.

### 6. Puntos / Top del día
Sin anti-spam incentiva pines basura.
MVP: 1 pin activo por usuario, cooldown, puntos solo por interacciones reales (respuestas, uniones), no por publicar.

### 7. Costos y factibilidad mapa
Google Maps SDK = costo y llaves. Para 50 mejor MapLibre + OSM/Carto, cluster nativo.

## Qué falta definir

- Métricas de éxito y go/no-go del piloto.
- Reglas de moderación y quién modera.
- Política de datos y consentimiento (ver `05-privacidad-legal.md`).
- iOS/Android o PWA, accesibilidad, offline básico.
- Modelo post-piloto: ¿quién paga? ¿universidad, publicidad, freemium?
