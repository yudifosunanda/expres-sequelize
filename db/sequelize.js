const { Sequelize } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize('expres', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres',
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
