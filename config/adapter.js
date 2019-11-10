require('dotenv').config();

const {
  DB_CLIENT,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_PORT,
  DB_NAME
} = process.env;

module.exports = {
  "knexOptions": {
    client: DB_CLIENT,
    connection: `${DB_CLIENT}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
  }
}