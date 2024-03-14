const ErrorHandler = require("../utils/errorHandler");
const Error = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  // wrong mongoDb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT Token
  if (err.name === "JsonWebTokenError") {
    const message = `JSON web token is invalid , try again`;
    err = new ErrorHandler(message, 401);
  }

  // Expired JWT Token
  if (err.name === "TokenExpiredError") {
    const message = `Your session has expired , please login again.`;
    err = new ErrorHandler(message, 401);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
