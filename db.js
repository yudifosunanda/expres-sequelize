// db.js
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'expres',
  password: '', // Ensure this matches your actual PostgreSQL password or leave it blank if it's empty
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to the PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;
