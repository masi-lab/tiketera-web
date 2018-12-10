
class Custom_error extends Error {
  constructor(code, nameError, message) {
    super(message);
  // Ensure the name of this error is the same as the class name
    let TAG={}
    TAG.name = nameError;
    TAG.code = code;
    TAG.message = message
    this.CUT_TAG=TAG
    Error.captureStackTrace(this, this.constructor);
  }
  setName(name) {
      this.name = name
  }
}

// Ejemplo de error cumtomizado
class UserError extends Custom_error {
  constructor(message, code) {
    super(message, code, 'UserError');
    //this.CUT_TAG.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports.UserError = UserError

module.exports.custom_error = Custom_error;