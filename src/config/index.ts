import 'dotenv/config'

export const dataMigration = {
  oldDatabaseURI: process.env.OLD_DB_URI,
  newDatabaseURI: process.env.NEW_DB_URI
}
