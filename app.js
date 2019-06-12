const express = require ('express');
const path = require('path');
const exphbs = require ('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// Load User Model
require('./models/User')

// Load story Model
require('./models/Story')

// Passport Config
require('./config/passport')(passport);

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth'); 
const stories = require('./routes/stories'); 


// Load keys
const keys = require('./config/keys');

// Handlebars Helpers
const {
    truncate,
    stripTags,
    formatDate
} = require('./helpers/hbs');

// connect to mongoose
mongoose
  .connect('mongodb://localhost/StoryBook-dev', { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

//   Handlebars Middleware
app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate
    },
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

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server Started on port ${port}`)
}); 