import crypto from 'crypto'

export async function createHashedPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex');
  const iterations = 10000;
  const keyLength = 64; // 64 bytes for sha512

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keyLength, 'sha512', (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        const hashedPassword = `${salt}:${derivedKey.toString('hex')}`;
        resolve(hashedPassword);
      }
    });
  });
}
