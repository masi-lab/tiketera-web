function Custom_error(code, name, msg){

  this.code =  code;
  this.message = msg;
  this.name = name;

}

module.exports.custom_error = Custom_error;