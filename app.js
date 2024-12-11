const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  const theme = req.cookies.theme || 'light';  
  const userIsAuthenticated = req.cookies.auth_token ? true : false; 

  res.render('index', { 
    theme,
    userIsAuthenticated 
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
