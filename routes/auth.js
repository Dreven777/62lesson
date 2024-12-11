const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const jwtSecret = '62lessonkey'; 

let users = []; // simulation database

router.post('/register', (req, res) => {
  const { username, password } = req.body;


  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // insert to database
  users.push({ username, password });

  const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
  res.cookie('auth_token', token, { httpOnly: true }); 
  res.redirect('/');  
  console.log('register')
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // find in database
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(400).send('Invalid username or password');
  }

  const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
  res.cookie('auth_token', token, { httpOnly: true }); 
  res.redirect('/'); 
  console.log('login')
});

module.exports = router;
