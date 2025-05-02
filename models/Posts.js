const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Import Sequelize instance

// Define Posts model
const Posts = sequelize.define('Posts', {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usr_id: {
    type: DataTypes.INTEGER,
  },
  post: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'posts', // Optional: Define table name
  timestamps: false,  // Optional: Disable createdAt and updatedAt columns
});

module.exports = Posts;
