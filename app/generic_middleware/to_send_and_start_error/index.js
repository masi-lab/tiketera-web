//little errorhanler middleware
async function errorHandler(err, req ,res, next){
    let errors = []
    //console.log(err);
    if (err.message.includes('CUT_TAG')){
        //console.log('CUT_TAG');
        // mongoose package all the validation errors, so we can have
        //more than 1 error
        let listOfErrors = err.message.split('"CUT_TAG"')
        //ignore the first, not contain a json
        for(i=1; i < listOfErrors.length; i++){
            let eWithJunk = listOfErrors[i]
            //slice the residual characters outside json
            let e = eWithJunk.slice(eWithJunk.indexOf('{'), eWithJunk.lastIndexOf('}'))
            e = JSON.parse(e)
            //for now, we will not keep stack from mongoose errors
            //e.stack = err.stack
            errors.push(e)
        }
    }else if(err.CUT_TAG !== undefined){
        //console.log('CUT_TAG 2');
        let dic = {};
        dic.message = err.CUT_TAG.message;
        dic.name = err.CUT_TAG.name;
        dic.code = err.CUT_TAG.code;
        errors.push(dic);
        //console.log(errors);
    }else if(err.getError){
        //console.log('getError');
        // if it is a custom error has getError() defined
        errors.push(err.getError())
      
    }else{
        //console.log('Error');
        errors.push(err)
    }
  
    let result = {
        success: false,
        data: req.data,
        error: errors
    }

    if(req.result === undefined)
        req.result = result;

    //console.log(err);

    next(err);
  }

async function toSend(req, res, next){
    let result = {
        data: req.data,
        error: req.error,
        success: true,
    }
    //console.log("ultimo send");
    
    req.status = req.status || 200;
    //console.log(result);
    res.status(req.status).send(result);
    //console.log('pasamos por el ult midd');
}


async function toSendError(err, req ,res, next){
    //console.log("ultimo error");
    //console.log(req.result)
    res.status(500).send(req.result);
}

module.exports.toSend = toSend;
module.exports.errorHandler = errorHandler;
module.exports.toSendError = toSendError;
