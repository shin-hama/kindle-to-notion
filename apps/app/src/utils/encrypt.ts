import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';

export function encrypt(raw: string, encryptionKey: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(encryptionKey, 'hex'),
    iv,
  );
  let encrypted = cipher.update(raw);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

export function decrypt(
  encryptedData: string,
  iv: string,
  encryptionKey: string,
) {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(encryptionKey, 'hex'),
    Buffer.from(iv, 'hex'),
  );
  let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
