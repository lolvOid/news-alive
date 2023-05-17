import cryptoJs from 'crypto-js'

export default function generateHashUniqueID(uuid) {
  return cryptoJs.SHA256(uuid).toString()
}
