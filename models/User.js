const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Import Sequelize instance

// Define User model
const User = sequelize.define('User', {
  usr_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.INTEGER,
  },
  address: {
    type: DataTypes.TEXT,
  },
  picture: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'user', // Optional: Define table name
  timestamps: false,  // Optional: Disable createdAt and updatedAt columns
});

module.exports = User;
