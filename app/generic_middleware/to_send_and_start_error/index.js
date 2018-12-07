//little errorhanler middleware
async function errorHandler(err, req ,res, next){
    //console.log(err.message);
    //console.log(err.name);
    let erro = {}

    erro["name"] = err.name; 
    erro["message"] = err.message; 
    erro["code"] = err.code; 

    let result = {
      data: req.data,
      error: erro
    }

    next(err);
  }

async function toSend(req, res, next){
    let result = {
        data: req.data,
        error: req.error
    }
    res.status(req.status).send(result);
    //console.log('pasamos por el ult midd');
}


async function toSendError(err, req ,res, next){
    res.status(500).send(result);
}

module.exports.toSend = toSend;
module.exports.errorHandler = errorHandler;
module.exports.toSendError = toSendError;
