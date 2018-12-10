//little errorhanler middleware
async function errorHandler(err, req ,res, next){
    let errors = []
    //console.log(err);
    if (err.message.includes('CUT_TAG')){
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
        let dic = {};
        dic.message = err.CUT_TAG.message;
        dic.name = err.CUT_TAG.name;
        dic.code = err.CUT_TAG.code;
        errors.push(dic);
        //console.log(errors);
    }else{
        errors.push(err)
    }
  
    let result = {
        success: false,
        data: req.data,
        error: errors
    }

    req.result = result;

    next(err);
  }

async function toSend(req, res, next){
    let result = {
        data: req.data,
        error: req.error
    }
    //console.log("ultimo send");
    res.status(req.status).send(result);
    //console.log('pasamos por el ult midd');
}


async function toSendError(err, req ,res, next){
    //console.log("ultimo error");
    res.status(500).send(req.result);
}

module.exports.toSend = toSend;
module.exports.errorHandler = errorHandler;
module.exports.toSendError = toSendError;
