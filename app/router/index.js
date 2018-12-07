const router_sticker = require("../app/sticker/router/router");
const router_user = require("../app/users/router/router");

module.exports = (router_app)=>{
    router_app.use("/sticker", router_sticker);
    router_app.use("/user", router_user);
    return router_app;
};
