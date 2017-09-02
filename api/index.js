const app = require('./server');
const Router = require('./src')(app);
const config = require('../config/config');
const logger = require('winston');

let apiUrl = `${config.apiUrl}` || `http://localhost:${config.port}`;

app.listen(config.port,
  () => logger.info(`Server started on ${apiUrl}`)
);
