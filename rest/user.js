const db = require('./../db');
const { query } = require('express-validator');
const User = require('../models/User');
const Post = require('../models/Posts');

User.hasMany(Post, { foreignKey: 'usr_id' });

const getUser = async (req, res) => {
  try {
    const result = await User.findAll({
      include: {
        model: Post,
        attributes: ['post_id', 'post'] // Choose what fields to include
      }
    });
    res.json(result); // Send the rows as JSON
  } catch (err) {
    res.status(500).send('Error executing query');
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByPk(id);

    if(result == null){
      let response = {
        "code":200
        ,"message":"tidak ada data"
        ,"data":result
      };

      res.json(response); // Send the rows as JSON

    }else{
      res.json(result); // Send the rows as JSON
    }
  } catch (err) {
    res.status(500).send('Error executing query');
  }
};

const addUser = async(req, res) => {
  let {name, email, gender, picture} = req.body;
  const profilePic = req.file ? req.file.filename : null;

  try {
    const result = await User.create({"name":name, 'email':email, "gender":gender, "profilePic":profilePic});
    res.json(result); // Send the rows as JSON
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error executing query');
  }
};

const updateUser = async(req, res) => {
  const { id } = req.params; // Extract id from URL parameters
  let {name, email, gender} = req.body;

  try {
    const updateData = await User.findByPk(id);

    updateData.name = name;
    updateData.email = email;
    updateData.gender = gender;

    await updateData.save();

    res.json(updateData); // Send the rows as JSON
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error executing query');
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params; // Extract id from URL parameters

  try {
    const data = await User.findByPk(id);

    data.destroy();
    
    res.json("success deleted user"); // Send the rows as JSON
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error executing query');
  }
};

module.exports = {
  getUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};