const express = require ('express');
const exphbs = require ('express-handlebars');
const mongoose = require ('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// Load User Model
require('./models/User')

// Passport Config
require('./config/passport')(passport);

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth'); 

// Load keys
const keys = require('./config/keys');

// connect to mongoose
mongoose
  .connect('mongodb://localhost/StoryBook-dev', { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

  const app = express();

//   Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars'); 


app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set global vars
app.use((req, res, next) => {
res.locals.user = req.user || null;
next();
});

// Use Routes
app.use('/', index);
app.use('/auth', auth);

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server Started on port ${port}`)
}); 