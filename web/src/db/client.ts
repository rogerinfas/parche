import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

let _db: ReturnType<typeof drizzle> | null = null

export function getDb() {
  const url = process.env.DATABASE_URL
  if (!url) return null
  if (!_db) {
    const client = postgres(url, { max: 5 })
    _db = drizzle(client)
  }
  return _db
}
