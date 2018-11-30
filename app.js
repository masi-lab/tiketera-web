var express = require("express");
var bodyParse = require("body-parser");
//why router_sticker/router_sticker??
var router_sticker = require("./router_sticker/router_sticker");

var app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

app.get("/", async function(req, res){
    res.send(`Nothing to do Here \nBut i have an Echoe for you:\nQuery: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)});
})

app.use("/sticker", router_sticker);

app.listen(8080);

//Old code, waiting to be removed soon
/*
app.get("/login",function(req, res){
    User.find(function(err, doc){
        console.log(doc);
        res.render("login");
    });
});

app.post("/users",function(req,res){
    console.log("contraseña: " + req.body.password);
    console.log("contraseña: " + req.body.email);

    var user = new User({email: req.body.email, 
                        password: req.body.password,
                        username: req.body.username})
    /*user.save(function(err){
        res.send("Datos guardados");
    });*//*
    user.save().then(
        function(us){
            res.send("Guardamos los datos");
        },
        function(err){
            if(err){
                console.log(String(err));
                res.send("No pudimos guardar los datos");
            }
        }
    );
});
*/
