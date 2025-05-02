const db = require('../db');
const { query } = require('express-validator');
const Post = require('../models/Posts');

const getPost = async (req, res) => {
  try {
    const result = await Post.findAll();
    res.json(result); // Send the rows as JSON
  } catch (err) {
    res.status(500).send('Error executing query');
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Post.findByPk(id);

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

const addPost = async(req, res) => {
  let {usr_id, post} = req.body;
console.log(req.body)
  try {
    const result = await Post.create({"usr_id":usr_id, "post":post});
    res.json(result); // Send the rows as JSON
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error executing query');
  }
};

const updatePost = async(req, res) => {
  const { id } = req.params; // Extract id from URL parameters
  let {usr_id, post} = req.body;

  try {
    const updateData = await Post.findByPk(id);

    updateData.usr_id = usr_id;
    updateData.post = post;

    await updateData.save();
    
    res.json(updateData); // Send the rows as JSON
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error executing query');
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params; // Extract id from URL parameters

  try {
    const data = await Post.findByPk(id);

    data.destroy();
    
    res.json("success deleted post"); // Send the rows as JSON
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error executing query');
  }
};

module.exports = {
  getPost,
  getPostById,
  addPost,
  updatePost,
  deletePost
};