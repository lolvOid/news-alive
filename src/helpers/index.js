import cryptoJs from 'crypto-js'

// By generating a hash ID, we ensure data integrity and provide a unique identifier for each request.
// This helps in scenarios where we need to track or reference specific fetched headlines,
// Allows the server to validate the integrity of the fetched data by comparing it with the expected hash ID on the server side.

/**
 * Generates a hash-based unique identifier for fetching headlines data.
 * @param {string} uuid - The UUID or any unique identifier for the request.
 * @returns {string} The generated hash ID.
 */
export default function generateHashUniqueID(uuid) {
  return cryptoJs.SHA256(uuid).toString()
}
