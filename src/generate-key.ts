import { randomBytes } from 'crypto'

// 生成 256 位的密钥
const secret = randomBytes(32).toString('hex')

console.log('Your secure secret key:', secret);

