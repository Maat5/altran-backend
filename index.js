'use strict';

let { pick } = require('lodash');
const env = pick(process.env, ['NODE_ENV', 'PROCESS_TYPE']);
const logger = require('winston');

if (!env.NODE_ENV)
  throw new Error('Is neccesary to specify an environment at NODE_ENV variable')

const envTypes = ['development', 'staging', 'production'];

if (envTypes.indexOf(env.NODE_ENV) === -1)
  throw new Error(`${env.NODE_ENV} is an unsupported env. Use one of: ${envTypes}`);

const processType = env.PROCESS_TYPE;

let config;

logger.info(`Starting '${processType}' process`, { pid: process.pid })
// create db connection
require('./config/connections');
// init server
require('./api/');