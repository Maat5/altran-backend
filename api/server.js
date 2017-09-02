const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const config = require('../config/config');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const app = express();
const compression = require('compression');
const logger = require('winston');
const path = require('path');

// Set logger
app.use(morgan('dev'));
// Set request config
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

// seurity middleware
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.noSniff());

// compress all requests
app.use(compression());

// enable CORS - Cross Origin Resource Sharing
app.use(cors({ origin: true, credentials: true }));

//enable https requests
app.enable("trust proxy");

//disables powered by express
app.disable('x-powered-by');

//set express session
app.use(session({
  secret: config.sessionToken,
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  cookie: {
    httpOnly: true,
    expires: config.sessionAgeMs // 1 hour
  },
  rolling: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection, autoRemove: 'native' })
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

module.exports = app
