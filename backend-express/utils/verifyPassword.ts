import crypto from 'crypto'

export async function verifyPassword(candidatePassword: string, storedPasswordHash: string) {
  const [salt, hash] = storedPasswordHash.split(':');
  const iterations = 10000;
  const keyLength = 64; // 64 bytes for sha512

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(candidatePassword, salt, iterations, keyLength, 'sha512', (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash === derivedKey.toString('hex'));
      }
    });
  });
}