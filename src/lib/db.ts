import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

// ─── Singleton Prisma Client (PrismaPg driver adapter) ───────────────────────
// Prisma 7 requires an explicit adapter or accelerateUrl at runtime.
// prisma.config.ts is CLI-only and is NOT read by PrismaClient at runtime.

const prismaClientSingleton = () => {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
export default prisma
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

// ─── prismaAuth alias ────────────────────────────────────────────────────────
// @next-auth/prisma-adapter calls standard model methods which work fine
// with the PrismaPg driver adapter. We re-export the same client.
export { prisma as prismaAuth }

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns true if the DB is reachable, false otherwise. */
export async function testDbConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection test failed:', error)
    return false
  }
}
