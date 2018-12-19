/*
    Este middleware sirve para realizar la logica de negocio
*/
const mongoose = require('mongoose');
const config_guest = require('../../../strategies/config')();
const User = require('../models_control/models_control').controlador_de_users;
const AuthError = require('../../../tools/tools').AuthError;
const pag_not_found = require('../../../tools/tools').pag_not_found

/*
const connUri = process.env.MONGO_LOCAL_CONN_URL;

async function bdConnect(connUri){

    mongoose.connect('mydomino', {useNewUrlParser: true}) //connUri
    
}*/
// See https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
module.exports = {

  add: async (req, res, next) => {
    //let dic = {name: req.data.name, password: req.data.password};
    let dic = req.data;
    let user = await User.save(dic)
    req.status = 201
    req.data = { data: user.toWeb(), error: false, token: user.getJWT() }
    next()
  },

  getMe: async (req, res, next) => {
    let user = req.user;
    req.status = 201

    if (req.user.username === config_guest.guestName) {
      req.data = { data: req.user, error: false, msg: 'You are NOT logged in' }
    } else {
      req.data = { data: user.toWeb(), error: false, msg: 'You are logged in' }
    }

    next()
  },

  login: async (req, res, next) => {
    let user = await User.findOne({ username: req.data.username });
    if (!user) throw new AuthError('USPW_INV', 'Username/password invalid');
    access = await user.comparePassword(req.data.password);
    if (!access) throw new AuthError('USPW_INV', 'Username/password invalid');
    req.data = { token: user.getJWT(), user: user.toWeb(), message: `Welcome ${user.username}` };
    req.status = 200
    return next();
  },
  // Esto seria el futuro
  login2: async (args) => {
    let data;
    let user = await User.findOne({ username: args.username });
    if (!user) throw new AuthError('USPW_INV', 'Username/password invalid');
    access = await user.comparePassword(args.password);
    if (!access) throw new AuthError( 'USPW_INV', 'Username/password invalid');
    data = { token: user.getJWT(), user: user.toWeb(), message: `Welcome ${user.username}` };
    //data.user.id = data.user.id.toString();
    return data;
  },

  deleteMe: async (req, res, next) => {
    let user = await Service.deleteMe(req);
    req.data = { user, message: 'User logged in deleted' }

    return next()
  },

  updateMe: async (req, res, next) => {
    user = await Service.updateMe(req)
    req.data = { user, message: 'Saved' }
    return next()
  },

  // Middleware de control de rutas
  control_rout: async (req, res, next) => {
    //console.log(req.params[0]);
    if(req.params[0] !== ''){
        throw new pag_not_found('404', 'pag not fuond');
    }
    next();
  }
}