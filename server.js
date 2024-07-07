'use strict';
require('reflect-metadata');
const { AppDataSource } = require('./src/data-source');

const passport = require('passport');
const initializePassport = require('./src/utils/passport-config');
initializePassport(passport);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

// Routers
const renderRouter = require('./router/render-router');
const renderCategoriesRouter = require('./router/categories-router');
const renderSecuritiesRouter = require('./router/securities-router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use(cors());
app.use(fileUpload());
app.use(flash());
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT ?? 3000;

AppDataSource.initialize();

app.use('/', renderRouter);
app.use('/categories', renderCategoriesRouter);
app.use('/security', renderSecuritiesRouter);

app
  .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
  })
  .on('error', error => {
    throw new Error(error.message);
  });
