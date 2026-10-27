import { createServerFn } from '@tanstack/react-start'
import { getDb } from '../db/client'
import { pins } from '../db/schema'

export const listPines = createServerFn({ method: 'GET' }).handler(async () => {
  const db = getDb()
  if (!db) return { source: 'mock', count: 5 }
  try {
    const rows = await db.select().from(pins).limit(50)
    return { source: 'db', count: rows.length, rows }
  } catch {
    return { source: 'mock', count: 5 }
  }
})

export const health = createServerFn({ method: 'GET' }).handler(async () => {
  return { ok: true, db: !!process.env.DATABASE_URL, ts: new Date().toISOString() }
})
