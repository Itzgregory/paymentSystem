class AppError extends Error {
    constructor(message, statusCode, responseObject) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? false : false;
      this.responseObject = responseObject;
      this.isOperational = true;
  
      if (!message) {
        switch (statusCode) {
          case 400:
            this.message = 'Bad Request - The request could not be understood or was missing required parameters.';
            break;
          case 401:
            this.message = 'Unauthorized - Authentication failed or user does not have permissions.';
            break;
          case 403:
            this.message = 'Forbidden - Access to the requested resource is forbidden.';
            break;
          case 404:
            this.message = 'Not Found - The requested resource could not be found.';
            break;
          case 409:
            this.message = 'Conflict - The request conflicts with the current state of the server.';
            break;
          case 422:
            this.message = 'Unprocessable Entity - The request was well-formed but was unable to be followed.';
            break;
          case 429:
            this.message = 'Too Many Requests - The user has sent too many requests in a given amount of time.';
            break;
          case 500:
            this.message = 'Internal Server Error - An error occurred on the server.';
            break;
          case 502:
            this.message = 'Bad Gateway - The server received an invalid response from the upstream server.';
            break;
          case 503:
            this.message = 'Service Unavailable - The server is currently unavailable.';
            break;
          default:
            this.message = 'An error occurred.';
        }
      }
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;