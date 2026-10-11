import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleRequest } from './handler.ts'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return handleRequest(req as any, res as any)
}
