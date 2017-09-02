const express = require('express');
const router = express.Router();
const ParserError = require('./middlewares/errors');

let Router = (app) => {
  // 404 Route
  app.use((req, res) => {
    res.status(404).send({
      code: 404,
      success: false,
      message: 'Not Found',
      description: 'Invalid request'
    });
  });
  // set lang to all routes and handle errors
  app.use(ParserError);
};

module.exports = Router;
