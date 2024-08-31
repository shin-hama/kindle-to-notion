export const hash = (key: string, seed: number = 0): string => {
  let h1 = seed
  const c1 = 0xcc9e2d51
  const c2 = 0x1b873593
  const r1 = 15
  const r2 = 13
  const m = 5
  const n = 0xe6546b64

  let len = key.length
  let i = 0

  while (len >= 4) {
    let k1 =
      (key.charCodeAt(i) & 0xff) |
      ((key.charCodeAt(i + 1) & 0xff) << 8) |
      ((key.charCodeAt(i + 2) & 0xff) << 16) |
      ((key.charCodeAt(i + 3) & 0xff) << 24)

    k1 = Math.imul(k1, c1)
    k1 = (k1 << r1) | (k1 >>> (32 - r1))
    k1 = Math.imul(k1, c2)

    h1 ^= k1
    h1 = (h1 << r2) | (h1 >>> (32 - r2))
    h1 = Math.imul(h1, m) + n

    i += 4
    len -= 4
  }

  let k1 = 0

  switch (len) {
    case 3:
      k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16
    case 2:
      k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8
    case 1:
      k1 ^= key.charCodeAt(i) & 0xff
      k1 = Math.imul(k1, c1)
      k1 = (k1 << r1) | (k1 >>> (32 - r1))
      k1 = Math.imul(k1, c2)
      h1 ^= k1
  }

  h1 ^= key.length
  h1 ^= h1 >>> 16
  h1 = Math.imul(h1, 0x85ebca6b)
  h1 ^= h1 >>> 13
  h1 = Math.imul(h1, 0xc2b2ae35)
  h1 ^= h1 >>> 16

  return (h1 >>> 0).toString(16)
}
