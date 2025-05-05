// Import dependencies
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var csrf = require('csurf');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// models
const { getUser, getUserById, addUser, updateUser, deleteUser } = require('./rest/user');
const { getPost, getPostById, addPost, updatePost, deletePost } = require('./rest/posts');

//validator
const { addUserValidationRules, updateUserValidationRules } = require('./rest/userValidator');
const { addPostValidationRules, updatePostValidationRules } = require('./rest/postValidator');
const { validationResult } = require('express-validator');
//file inputs
const multer = require('multer');
const path = require('path');

// Initialize Express app
const app = express();

// sequilize
const sequelize = require('./db/sequelize');

// rate limit
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser('secretKey'));
var csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);
app.use('/uploads', express.static('uploads'));
app.use(helmet());
app.use(limiter)

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/; // Allowed file types
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    return cb(null, true);
   
  }
});

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};

// Define a route to fetch data from the user table
// Route to provide CSRF token to the client
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.get('/home', (req, res)=>{
  let datas = [
    {
      "name":"difo",
      "gender":"male"
    }
    ,{
      "name":"difo",
      "gender":"male"
    }
  ];
  res.json(datas);
});

app.get('/', (req, res)=>{
  let datas = [
    {
      "name":"difo",
      "gender":"male"
    }
    ,{
      "name":"difo",
      "gender":"male"
    }
  ];
  res.json(datas);
});

// user routes
app.get('/users', getUser);
app.get('/users/:id', getUserById);
app.post('/user/add',csrfProtection, upload.single('profilePic'), addUserValidationRules(), validate, addUser);
app.put('/user/update/:id', updateUser);
app.delete('/user/delete/:id', deleteUser);

// post  routes
app.get('/post', getPost);
app.get('/post/:id', getPostById);
app.post('/post/add',csrfProtection, upload.none(), addPostValidationRules(), validate, addPost);
app.put('/post/update/:id', upload.none(), updatePost);
app.delete('/post/delete/:id', deletePost);


// Sync models with database
sequelize.sync({ alter: true }) // Use { force: true } to drop tables and recreate them
.then(() => console.log('Database synced'))
.catch(err => console.error('Error syncing database:', err));

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});