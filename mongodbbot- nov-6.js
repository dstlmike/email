#!/bin/env node
//

//var req = this.req;
//var res = this.res;

var express = require("express"); 
var app = express()

var path = require('path');
var bodyParser = require("body-parser"); 
var mongoose = require('mongoose'); 
var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'; 
var db = mongoose.connection; 
var nodemailer = require('nodemailer');
var moment = require('moment'); 
var date = moment().utcOffset(-240).format('LLLL');
//var demo = require('./commands/countdown.html');
var fs = require('fs');
var name, email, pass, password, phone;
var http, director, bot, router, server, port, db;

http        = require('http');
director    = require('director');
bot         = require('./bot.js');
today       = require('./bot.js');
//var countdown;

//image       = require('./2A34A9R.jpg');
/*
router = new director.http.Router({
  '/'    : {
    get: ping
  },

'/home' : {
get: home
},

'/rend' : {
get: rend
},


'/signup_success' : {
post: signup
},


'/amaral' : {
get: amaral
},

'/commandlist' : {
get: bot.commands
},


'/login' : {
get: login,
post: login
},


'/test' : {
get: test
},

  '/init' : {
    get:  bot.init,
    post: bot.init
  },

'/countdown' : { 
    get: count
 },

  '/commands' : {
    get: bot.commands
   
  },


  '/bot/:botRoom' : {
    get: ping,
    post: bot.respond
  },
  
});

server = http.createServer(function (req, res, err) {
  req.chunks = [];
  res.chunks = [];

  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
     
  });
 


  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);

  });


});

port = Number(process.env.NODEJS_SERVICE_PORT || process.env.PORT || 8080 || 3002);
ip = process.env.NODEJS_SERVICE_IP || "0.0.0.0" || "127.0.0.1";

//server.listen(port, ip);

server.listen(port, ip, function() { 
console.log('Server started at ' + date + ' & listening on port ' + port);
router.post('Server');
*/
console.log((new Date()) + ' Server is listening on port ' + port);
//});

//--------------


/*

function iterateFunc(doc) { 
console.log(JSON.stringify(doc, null, 4)); 
} 

function errorFunc(error) { 
console.log(error); 
} 
cursor.forEach(iterateFunc, errorFunc);

*/


mongoose.connect(connection_string); 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

app.use(bodyParser.json()); 

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 

   extended: true
})); 

  

app.post('/signup_success_2', function(req,res){ 

    var name = req.body.name; 

    var email = req.body.email; 

    var pass = req.body.password; 

    var phone =req.body.phone; 

  

    var data = { 

        "name": name, 

        "email":email, 

        "password":pass, 

        "phone":phone 

    } 

db.collection('details').insertOne(data, function(err, collection){ 

        if (err) throw err; 

        console.log("Record inserted Successfully"); 

              

    }); 

          

    return res.redirect('signup_success.html'); 
}) 

  

  

app.get('/home_2',function(req, res){ 
res.set({ 

    'Access-control-Allow-Origin': '*'

    }); 

//return res.redirect('index.html'); 
//});

  
return res.redirect('index.html'); 
}).listen(8080);
  

console.log("server listening at port 8080"); 


/*


function ping() {
  this.res.writeHead(200);
  this.res.end("I am AlexBot.\n\For a list of commands go to\n\http://nodejs-mongo-persistent-cc.b9ad.pro-us-east-1.openshiftapps.com/login");
}

function count() {
  this.res.statusCode = 200; 
this.res.setHeader('Content-type', 'text/html'); 
var html = fs.readFileSync(path.join(__dirname + "/views/countdown.html")); 
this.res.write(html); 
this.res.end();
}

function test() {
  this.res.statusCode = 200; 
this.res.setHeader('Content-type', 'text/html'); 
var html = fs.readFileSync(path.join(__dirname + "/views/test.html")); 
this.res.write(html); 
this.res.end();
}

function home() {
  //this.res.writeHead(200); //, {"Content-Type": "text/html"});
this.res.statusCode = 200; 
this.res.setHeader('Content-type', 'text/html'); 
var html = fs.readFileSync(path.join(__dirname + "/views/home.html")); 
this.res.write(html); 


 // this.res.write(fs.readFile(path.join(__dirname + "./countdown.html"))); 
  this.res.end();
}


function rend() {
  this.res.statusCode = 200; 
this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*'); 
var html = fs.readFileSync(path.join(__dirname + "/index.html")); 
this.res.write(html); 
this.res.end();
}

function signup() {
var name = this.req.body.name; 

    var email = this.req.body.email; 

    var pass = this.req.body.password; 

    var phone = this.req.body.phone; 

  

    var data = { 

        "name": name, 

        "email": email, 

        "password": pass, 

        "phone": phone 

    }


   var cursor = db.collection('details').find({name:name}); 
var ret = []; 
var results = cursor; //.each();
*/
/*
var res = {
"name": name
}
*/
/*
var resName = res.name;
results.each(function(err, callback) {
var name = this.req.body.name; 

    var email = this.req.body.email; 

    var pass = this.req.body.password; 

    var phone = this.req.body.phone; 

  

    var data = { 

        "name": name, 

        "email": email, 

        "password": pass, 

        "phone": phone 

    } 


//results.each(); //(res, i) => { 
//i = 0;
//if (results.doc > 0) { //> 0) {
if (data.name != 

console.log(results.doc); 
// Here you could build your html or put the results in some other data structure you want to work with 
return results.doc;

} else {
*/
/*
db.collection('details').insertOne(data, function(err, collection){ 
if (!data.name) {
        if (err) 
 throw err; 

console.log(data.name + "\n User added"); 
//-----
*/


/*
cursor.each(function(err, doc){
doc = {
"name": name,
"email": email,
"password": pass,
"phone": phone
}
var name = data.name; //: {name}; //this.req.name; 

    var email = data.email; //: {email}; 

    var pass = data.password; //: {password}; 

    var phone = data.phone; //: {phone}; 

  //if(doc.name = name) {
if(!doc.name) { //!= null) { //name != null) { //doc.name = name) {
*/
/*
db.collection('details').insertOne(data, function(err, collection){ 

        if (err) 
 throw err; 

       // console.log("Record inserted Successfully"); 


//});
  // } else {



//console.log(res.name + " already exist");




  //});
   */
/*
});
}
});



//exports.getAllDocuments = function(collection, callback) { mongoDB.connect(connection_string, function(err, db) { if(err) throw err; var allDocs = db.collection(collection).find().toArray(function(err, docs) { callback(docs); //db.close(); }); });}

          

   // this.res.redirect('signup_success.html'); 


  this.res.statusCode = 200; 
this.res.setHeader('content-type', 'text/html', 'Access-control-Allow-Origin', '*'); 
var html = fs.readFileSync(path.join(__dirname + "/signup_success.html")); 
this.res.write(html); 
//this.res.redirect('signup_success.html'); 
this.res.end();
}



function amaral() {
  //this.res.writeHead(200); //, {"Content-Type": "text/html"});
this.res.statusCode = 200; 
this.res.setHeader('Content-type', 'text/html'); 
var html = fs.readFileSync(path.join(__dirname + "/views/amaral.html")); 
this.res.write(html); 


 // this.res.write(fs.readFile(path.join(__dirname + "./countdown.html"))); 
  this.res.end();
}

function login() {
  //this.res.writeHead(200); //, {"Content-Type": "text/html"});
this.res.statusCode = 200; 
this.res.setHeader('Content-type', 'text/html'); 
var html = fs.readFileSync(path.join(__dirname + "/views/login.html")); 
this.res.write(html); 


 // this.res.write(fs.readFile(path.join(__dirname + "./views/login.html"))); 
  this.res.end();
}
*/
/*
function form(req, res, data) {
res.sendFile('./commands/index.html', { root: __dirname }) 
var firstname = this.req.query.firstname; 
if (firstname != "") { 
this.res.send("Your email address is " + firstname + "@gullele.com"); 
} else { 
this.res.send("Please provide us first name"); 
} 
}

*/


/*
response.sendFile(__dirname + "./countdown.html"); 
});

function forms() {
//http.createServer(function(req, res){ 
if (req.url === '/form') { 
res.writeHead(200, {'Content-Type': 'text/html'}); 
fs.createReadStream('./commands/index.html').pipe(res); 
} else if (ext.test(req.url)) { 
fs.exists(path.join(__dirname, req.url), function (exists) { 
if (exists) { 
res.writeHead(200, {'Content-Type': 'text/html'}); 
fs.createReadStream('./commands/index.html').pipe(res); 

} else { 
res.writeHead(404, {'Content-Type': 'text/html'}); 
fs.createReadStream('404.html').pipe(res); 
});
//} else { 
// add a RESTful service 
} 
})//.listen(port, ip);

}

function forms(req, res, function(data)) {
//var req = this.req;
 //this.res.sendFile(__dirname+"/views/index.html");
 this.res.writeHead(200, {"Content-Type": "text/html"});
this.res.sendFile(__dirname + "/commands/" + "index.html");

  //this.res.end("yes");
}
*/
// -

