class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode || 500;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(msg, details) { return new ApiError(400, msg, details); }
  static unauthorized(msg = "Unauthorized") { return new ApiError(401, msg); }
  static notFound(msg = "Not found") { return new ApiError(404, msg); }
  static conflict(msg, details) { return new ApiError(409, msg, details); }
  static internal(msg = "Internal server error") { return new ApiError(500, msg); }
}

module.exports = ApiError;
