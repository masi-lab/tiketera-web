const passport = require('passport');
var Custom_error = require("../../tools/tools").Custom_error;

async function middle_passport(req,res,next) {
  //WORKS!
  console.log('pre await');

  //WARNING passport.authenticate returns a function.. calling finally with (req, res, next)
    await passport.authenticate('jwt', function(err, user, info) {
    //info gets an error if token is invalid
        console.log('in await cb')
        //console.log(info.message)
        if (info){
            console.log('Error UnauthorizedError')
            throw new Custom_error('por verse', 'Error de autorizacion', 'El token no es correcto');
        }
        if (err) {
            console.log('MY ERROR FROM TOKEN');
            return next(err);
        }
        if (!user) {
            console.log('MY ERROR FROM NOT USER');
            return next(err); 
        }
        req.user = user;
        //console.log(req.user)
        return next();
    })(req, res, next);

  console.log('post await');
  //BE CAREFUL authenticate dont seems to be async.. so escapes before get user
  //authenticate return a function!!
  //return next()
}

module.exports.middle_passport = middle_passport;