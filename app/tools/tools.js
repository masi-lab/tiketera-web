
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

// Ejemplo de error cumtomizado
class UserError extends Custom_error_with_cut_tag {
  constructor(message, code) {
    super(message, code, 'UserError');
    //this.CUT_TAG.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor);
  }
}

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


//----------------------------------------------------------------------------------------------

module.exports.depurar_codigo = depurar_codigo

module.exports.UserError = UserError

module.exports.Custom_error_with_cut_tag = Custom_error_with_cut_tag;
module.exports.Custom_error = Custom_error;