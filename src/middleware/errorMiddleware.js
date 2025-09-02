const ApiError = require('../utils/ApiError');

module.exports = (err, req, res, next) => {
  // 1) Loger l'erreur pour debug (en dev on veut tout)
  console.error(err);

  // 2) Handling Mongoose validation errors (required, unique via mongoose-unique-validator)
  if (err.name === 'ValidationError') {
    const errors = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
    return res.status(400).json({
      status: 'fail',
      message: 'Validation error',
      errors
    });
  }

  // 3) Handling duplicate key error (MongoDB E11000)
  if (err.code && err.code === 11000) {
    // err.keyValue contains les champs en doublon { email: 'a@b.com' }
    return res.status(409).json({
      status: 'fail',
      message: 'Duplicate field value',
      fields: err.keyValue
    });
  }

  // 4) Si c'est une ApiError (créée volontairement)
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.statusCode >= 500 ? 'error' : 'fail',
      message: err.message,
      details: err.details || null
    });
  }

  // 5) Cas générique (erreur inconnue)
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({
    status: statusCode >= 500 ? 'error' : 'fail',
    message,
    details: err.details || null
  });
};
