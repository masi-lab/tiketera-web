const { ExtractJwt, Strategy } = require('passport-jwt');
const passport = require('passport')
const User = require('../users/models/users');

//strategy takes jwt, decrypt and get id from user. inyect in req as req.user
module.exports = function(){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secretThatIWillChange';

    passport.use(new Strategy(opts, async function(jwt_payload, done){
        user = await User.findById(jwt_payload.user_id);
        //if(err) return done(err, false);
        if(user) {
            return done(null, user);
        }else{
            //return done(null, false); // podrias ser error
            throw new Custom_error("100", "Error de logeo" ,"No se encuentra autorizado a realizar esta operacion");
        }
    }));
}