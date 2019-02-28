const router_sticker = require("../app/sticker/router/router");
const router_sticker2 = require("../app/sticker2/router/router");
const router_sticker3 = require("../app/sticker3/router/router");
const router_sticker4 = require("../app/sticker4/router/router");
const router_user = require("../app/users/router/router");


// Setup Passport Strategies for api/v1
require('../strategies/guest')();
require('../strategies/jwt')();


module.exports = (router_app)=>{
    router_app.use("/sticker", router_sticker);
    router_app.use("/sticker2", router_sticker2);
    router_app.use("/sticker3", router_sticker3);
    router_app.use("/sticker4", router_sticker4);
    router_app.use("/user", router_user);
    return router_app;
};
