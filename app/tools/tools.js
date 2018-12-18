
class Custom_error_with_cut_tag extends Error {
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

class UserError extends Custom_error_with_cut_tag {
  constructor(code, message) {
    super(code, 'UserError', message);
    
    Error.captureStackTrace(this, this.constructor);
  }
}
//module.exports.UserError = UserError

function depurar_codigo(codigo){
    let permitidos = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789"
    respuesta = ""
    for (let index=0 ; index < String(codigo).length; index++){
        for (let index_per=0 ; index_per < String(permitidos).length; index_per++){
            if (index == index_per){
            respuesta = respuesta + i
            }
        }
    }
    return respuesta;
}

//----------------------------------------------------------------------------------------------

//Base Extend to errors outside mongoose Scope
class Custom_error extends Error {
    constructor(code, nameError, message) {
      super(message);
      this.name = nameError
      this.code = code
      Error.captureStackTrace(this, this.constructor);
    }
    getError(){
      return {name:this.name, message:this.message,code:this.code}
    }
  }

  //One per type of errors
  class UnauthorizedError extends Custom_error{
    constructor(code, message) {
      super(message, code, 'UnauthorizedError');
      Error.captureStackTrace(this, this.constructor);
    }
  }

  //One per type of errors
class AuthError extends Custom_error {
  constructor(code, message) {
    super(code, 'AuthError', message);
    Error.captureStackTrace(this, this.constructor);
  }
}

class pag_not_found extends Custom_error {
  constructor(code, message) {
    super(code, 'Pag not found', message);
    Error.captureStackTrace(this, this.constructor);
  }
}

//----------------------------------------------------------------------------------------------

module.exports.depurar_codigo = depurar_codigo

module.exports.UserError = UserError

module.exports.Custom_error_with_cut_tag = Custom_error_with_cut_tag;
module.exports.Custom_error = Custom_error;

module.exports.AuthError = AuthError;
module.exports.pag_not_found = pag_not_found;