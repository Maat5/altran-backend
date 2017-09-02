const mongoose = require('mongoose');
const config = require('./config');
const logger = require('winston');

const uri = `mongodb://${config.db.host}/${config.db.database}`;

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useMongoClient: true,
  user: config.db.username,
  password: config.db.password
})
.then(
  () => logger.info(`Connected to DB ${uri}`),
  err => { throw err }
);