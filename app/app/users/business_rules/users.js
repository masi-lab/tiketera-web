/*
    Este middleware sirve para realizar la logica de negocio
*/
const mongoose = require('mongoose');
const config_guest = require('../../../strategies/config')();
const User = require('../models_control/models_control').controlador_de_users;
//const User = new C_User ();

/*
const connUri = process.env.MONGO_LOCAL_CONN_URL;

async function bdConnect(connUri){

    mongoose.connect('mydomino', {useNewUrlParser: true}) //connUri
    
}*/
// See https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
module.exports = {

    add: async (req, res, next) => {
        //let dic = {name: req.data.name, password: req.data.password};
        let dic =  req.data;
        let user = await User.save(dic)
        req.status =201
        req.data={data: user.toWeb(), error: false, token:user.getJWT()}
        next()
    },

    getMe: async (req, res, next) => {
        let user = req.user;
        req.status =201

        if(req.user.username === config_guest.guestName){
            req.data={data: req.user , error: false, msg: 'You are NOT logged in'} 
        }else{
            req.data={data: user.toWeb(), error: false, msg: 'You are logged in'}
        }

        next()
    },
    
    login: async (req, res, next) => {
        let user = await User.findOne({username: req.data.username});
        if (!user) throw new UserError('Username/password invalid', 'USPW_INV');
        access = await user.comparePassword(req.data.password);
        if (!access) throw new UserError('Username/password invalid', 'USPW_INV');
        req.data = { token: user.getJWT(), user: user.toWeb(), message: `Welcome ${user.username}` };
        req.status =200
        return next();
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
}