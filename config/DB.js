var mongoose = require('mongoose');
var server = require('../tools/serverTools')
const User = require('../app/app/users/models/users');

const CONFIG = require('./config')

const options = CONFIG.MONGO.OPTIONS
const uriDB = `${CONFIG.MONGO.CONN_URL}:${CONFIG.MONGO.CONN_PORT}/${CONFIG.MONGO.DB_NAME}`

//export this function and imported by app.js
module.exports = {

  connectDB: function () {
    mongoose.Promise = global.Promise
    mongoose.connect(uriDB, options);
    mongoose.connection.on('connected', function () {
      console.log(`${server.tagCyan} Succefully connected to ${uriDB}`);
      //createAdmin()
    });

    mongoose.connection.on('error', function (err) {
      console.log(`${server.tagRed} Cannot connect to DB, reason: ${err}`);
    });

    mongoose.connection.on('disconnected', function () {
      console.log(`${server.tagRed} Disconnected from DB`);
    });

    process.on('SIGINT', () => {
      if (CONFIG.MONGO.DROP_DATABASE_AT_EXIT) {
        console.log(`${server.tagMagenta} Deleting DB`);
        mongoose.connection.dropDatabase();
      }
      console.log(`${server.tagRed} Closing DB connection`);
      mongoose.connection.close()
      console.log(`${server.tagRed} Exiting`);
      process.exit(0);
    })

  }

}


// *************** REVISAR ***************
async function createAdmin(){
  admin = await User.findOne({username: 'admin'})
  if(!admin){
    admin = new User
    admin.username = 'admin'
    admin.password = 'admin'
    admin.role = 'admin'
    admin.save()
  }
}