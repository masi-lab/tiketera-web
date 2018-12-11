/*
  Esto es la base de datos (modelo, etc)
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// MUUY IMPORTANTE !!!!
//mongoose.connect("mongodb://localhost/stiker_0_2", options={useNewUrlParser: true}) // ESTO VA UNA SOLA VEZ

// schema maps to a collection
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: 'String',
    required: true,
    trim: true
  }
});

// encrypt password before save
userSchema.pre('save', async function(next) {
  const user = this;
  const saltRounds = 10;
  if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
    next();
  }
  let pwHashed = await bcrypt.hash(user.password, saltRounds)   
  user.password = pwHashed
  next()
});

userSchema.methods.comparePassword = async function(pw){
  let err, pass;
  if(!this.password) throw new Error('mono no tiene contra');
  console.log('pw in compare: ', this.password)

  pass = await bcrypt.compare(pw, this.password);
  if(!pass) throw new Error('mono no da la contra');
  return this;
}

userSchema.methods.getJWT = function(){
  //let expiration_time = parseInt(CONFIG.jwt_expiration);
  //see middleware/passport to change secret and expire
  return "Bearer "+jwt.sign({user_id:this._id}, 'secretThatIWillChange', {expiresIn: 10000});
};

userSchema.methods.toWeb = function(){
  let json = this.toJSON();
  json.id = this._id;//this is for the front end
  delete json.password; // i dont wanna send hash pwd
  return json;
};

var Users = mongoose.model("Users", userSchema);

module.exports.Users = Users;
