import { pgTable, text, timestamp, integer, boolean, uuid, doublePrecision } from 'drizzle-orm/pg-core'

// MVP Parche — Postgres + PostGIS (geo como lat/lng; migrar a geography(Point) en prod)
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  emailUni: text('email_uni').notNull().unique(),
  verificado: boolean('verificado').default(false),
  sede: text('sede').default('Chapinero'),
  creado: timestamp('creado').defaultNow(),
})
export const profiles = pgTable('profiles', {
  userId: uuid('user_id').primaryKey(),
  handle: text('handle').unique(),
  carrera: text('carrera'),
  intereses: text('intereses').array(),
  bio: text('bio'),
})
export const pins = pgTable('pins', {
  id: uuid('id').defaultRandom().primaryKey(),
  autorId: uuid('autor_id'),
  tipo: text('tipo').notNull(),
  texto: text('texto').notNull(),
  lat: doublePrecision('lat').notNull(),
  lng: doublePrecision('lng').notNull(),
  expiraAt: timestamp('expira_at').notNull(),
  activo: boolean('activo').default(true),
  creado: timestamp('creado').defaultNow(),
})
export const availability = pgTable('availability', {
  userId: uuid('user_id').primaryKey(),
  actividad: text('actividad').notNull(),
  hasta: timestamp('hasta').notNull(),
  lat: doublePrecision('lat'),
  lng: doublePrecision('lng'),
  activo: boolean('activo').default(true),
})
export const greetings = pgTable('greetings', {
  id: uuid('id').defaultRandom().primaryKey(),
  de: uuid('de'),
  para: uuid('para'),
  estado: text('estado').default('pending'),
  creado: timestamp('creado').defaultNow(),
})
export const chats = pgTable('chats', { id: uuid('id').defaultRandom().primaryKey() })
export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  chatId: uuid('chat_id'),
  de: uuid('de'),
  texto: text('texto').notNull(),
  creado: timestamp('creado').defaultNow(),
})
export const points = pgTable('points', {
  userId: uuid('user_id').primaryKey(),
  puntos: integer('puntos').default(0),
  dia: text('dia'),
})
