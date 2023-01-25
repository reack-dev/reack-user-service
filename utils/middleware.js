const logger = require('./logger');

const unkownEndpoints = (req, res, next) => {
  res.status(404).send({ error: 'Unknown Endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  next(error);
};

module.exports = {
  unkownEndpoints,
  errorHandler,
};
