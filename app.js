require('dotenv').config();

const express = require('express');
// helps us create different layouts for our website that we can reuse
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const methodOverride = require("method-override");
// create express app
const app = express();
const port = 5000 || process.env.PORT;

app.use(session({
  secret: 'note app',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  // cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  // Date.now() - 30 * 24 * 60 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());
// pass data through forms and pages
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
//connect to Database
connectDB();

//Static files 
app.use(express.static('public'));
// templating engine 

app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

// Routes 
app.use('/', require('./server/routes/auth'));
app.use('/',require('./server/routes/index'));
app.use('/',require('./server/routes/dashboard'));
// handle 404 

app.get('*',function(req,res){
  res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });