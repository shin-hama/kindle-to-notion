import crypt from 'crypto'

export function hash(data: string): string {
  return crypt.createHash('sha256').update(data).digest('hex')
}
