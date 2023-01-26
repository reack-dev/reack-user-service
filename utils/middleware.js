const logger = require('./logger');

const unkownEndpoints = (req, res, next) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  next(err);
};

module.exports = {
  unkownEndpoints,
  errorHandler,
};
