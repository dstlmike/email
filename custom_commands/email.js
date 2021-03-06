//A module for sending e-mails
//
var commands;
var db_table = 'email';
var db_email_archived = 'email_archived';
var db_email_sent = 'email_sent';
var dateHelper = require('../bot.js');
var moment = require('moment-timezone'); 
var date = moment.tz('America/Toronto').format('LLLL');

var emailCommands = [addEmailCmd, addSubjectCmd, addBodyCmd, sendEmailCmd];
var db = require('../modules/db.js');

var config = require('../config/config.js');
var fs           = require('fs');
var concat       = require('concat');
var cron = require('node-cron'); 
var express = require('express'); 
var nodemailer = require('nodemailer'); 
app = express(); 

getAllCommands();
exports.modName = "email";

function getAllCommands() {
  db.getAllDocuments(db_table, function(res){
    commands = res;
  });
}



function addEmailToDB(cmd, callback) {
setTimeout(function() {
  db.addDoc(db_table, cmd, callback);
}, config.delay_four);
}

function findStatus(status, callback){ 
db.findDocs(db_table, {"status": commands[cmd].status}, callback);
}

function updateDraft(cmd, updateJson, callback){
  var findJson = {
    "status": cmd["status"]
  }

  db.updateOneDoc(db_table, findJson, updateJson, callback);
}


function findDraft(cmd, callback){
  var matchHash = {
    "status": cmd.status
  };

  db.findDocs(db_table, matchHash, callback);
}


function updateDraftt(cmd, callback) {
  db.updateOneDoc(db_table, {"status": cmd.status}, {$set: { "status": cmd.status}}, callback);
}

function updateUndraft(cmd, callback) {
//setTimeout(function() {
  db.updateOneDoc(db_table, {"status": cmd.status}, {$set: { "status": "archived" }}, callback);
//}, config.delay_one);
}

function updateFlynnBotCurrent(flynnb, callback) {
setTimeout(function() {
  db.updateOneDoc(db_table, { "name": flynnb.name } || { "current": flynnb.current }, { $rename: { "current": "lastUpdate" }}, callback);
}, config.delay_two);
}


function updateSent(cmd, callback) {

//setTimeout(function() {

  db.updateOneDoc(db_table, {"status": cmd.status}, {$set: { "status": "sent" }}, callback);
//}, config.delay_one);
}

function updateSubject(cmd, callback) {
  db.updateOneDoc(db_table, {"status": cmd.status}, {$set: { "subject": cmd.subject }}, callback);
}

function updateBody(cmd, callback) {
  db.updateOneDoc(db_table, {"status": cmd.status}, {$set: { "body": cmd.body }}, callback);
}

function moveSentDoc(cmd, callback) {
setTimeout(function() {
db.moveOneDoc(db_email_sent, cmd, callback);
}, config.delay_one);
}

function moveArchiveDoc(cmd, callback) {
setTimeout(function() {
var findJson = { cmd: cmd }; 
db.moveOneDoc(db_email_archived, findJson, callback);
}, config.delay_one);
getAllCommands(); 
}


function deleteDoc(cmd, callback){
 // var findJson = { "status": cmd["status"] }; //commands[cmd].status };
//setTimeout(function() {
  //db.removeOneDoc(db_table, findJson);
//}, config.delay_three);
//}
setTimeout(function() {
var findJson = { "status": cmd.status }; 
db.removeOneDoc(db_table, findJson, function(result){ 
}, config.delay_three);
getAllCommands(); 
});
}

//*************

function findStats(status, callback){ 
db.findDocs(db_table, {"status": status}, callback);
}


//*************

exports.checkCommands = function(dataHash, callback) {
 if (dataHash.isMod) 
    for (cmd in commands) {
      cmd = commands[cmd];
  //if (cmd.draft == 'cc' && dataHash.currentBot.type == 'hp') 
//continue;

     //var cmdReg = new RegExp(cmd.regex, "i"); 

     //var flynnbcReg = new RegExp(flynnb.regexcurrent, "i");  
        
    // if (cmd.status == "draft" && dataHash.request.text && cmdReg.test(dataHash.request.text)){
       //var val = cmdReg.exec(dataHash.request.text);
      
     // } else if (flynnbc.bots.indexOf(dataHash.currentBot.type) > -1 && dataHash.request.text && flynnbcReg.test(dataHash.request.text)){
        //var val = flynnbcReg.exec(dataHash.request.text);
   

      //if (cmd.bots.indexOf(dataHash.currentBot.type) > -1 && dataHash.request.text && cmdReg.test(dataHash.request.text)){
        //var val = cmdReg.exec(dataHash.request.text);

//var msg = "";
          //if (callback) {
          
         //callback(true, msg, []);
    

    //break;
   // }
  }

  for (cmd in emailCommands) {
    var test = emailCommands[cmd](dataHash.request, dataHash.bots, dataHash.isMod, callback);
    if (test)
      return test;
   }
 }




exports.botName = "emailBot";

exports.setAll = function(emailHash) {
  commands = emailHash;
}

exports.getAll = function() {
  return commands;
}

exports.getCmdListDescription = function () {
  return null;
}

function addEmailCmd(request, bots, isMod, callback) {
  var regex = /^\/email ([\s\S]+)/i; //  (.*?$)/gmi; // ([\s\S]+)/i; //(.*?$/gm)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " you have no power here!";
      callback(true, msg, []);
      return msg;
    }

//*********
/*
findStats(function(doc){ 
if (doc.status == "draft"){ 
//var rnd = Math.floor(Math.random() * docs.length); 
//var msg = '"' + docs.status + '" - ' + docs[rnd].date; callback(msg); } }); return true; } else { return false; }}

commands.push(doc);
   moveArchiveDoc(doc);

}
}
*/
//*********

    for (cmd in commands) {   
if (commands[cmd].status = "draft") {
        updateUndraft(commands[cmd]);
        //moveArchiveDoc(commands[cmd]);
        //deleteDoc(commands[cmd]);
      //if (commands[cmd].status = "draft") {
        
        //var msg = "Current week updated";
        //callback(true, msg, []);
     }
      
        
//if (commands[cmd].status = "draft" || "archived") {
      //  moveArchiveDoc(commands[cmd]);
       // deleteDoc(commands[cmd]);

}

for (cmd in commands) {   
if (commands[cmd].status = "archived") {
 //setTimeout(function() {    
   moveArchiveDoc(commands[cmd]);
//}, config.delay_one);
}
}

for (cmd in commands) {   
if (commands[cmd].status = "archived") {
       deleteDoc(commands[cmd]);

}
}

/*
for (cmd in commands) {   
if (commands[cmd].status == "draft") {
 //setTimeout(function() {    
var emailDraft = { 
name: cmd.name, 
to: cmd.to, 
status: cmd.draft, 
description: cmd.description, 
bots: cmd.bots, 
date: cmd.date
};
commands.push(emailDraft);
   moveArchiveDoc(emailDraft);
//}, config.delay_one);
}
}
*/

//for (cmd in commands) {   
//if (commands[cmd].status = "draft" || "archived") {
       
      var emailHash = {
      name: "Drafted by " + request.name + " on " + date,
      to: val[1],
      status: "draft",
      description: "Email Bot",
      bots: Object.keys(bots),
      date: date
     };
    
    commands.push(emailHash);
    addEmailToDB(emailHash);
    var msg = "Email address received, type /subject followed by email subject to continue";
    callback(true, msg, []);
    return msg;
    }
  }




function addSubjectCmd(request, bots, isMod, callback) {
  var regex = /^\/subject ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " who you trying to kid?";
      callback(true, msg, []);
      return msg;
    }

    for (cmd in commands) {
      if (commands[cmd].status == "draft") {
        commands[cmd]["subject"] = val[1];
        updateSubject(commands[cmd]);
        var msg = "Email subject recieved, type /body followed by email body to continue";

        callback(true, msg, []);
        return msg;
      }
      
    }
   
  
 // var msg = val[1] + " doesn't exist";
   // callback(true, msg, []);

   // return msg;
  }
}



function addBodyCmd(request, bots, isMod, callback) {
  var regex = /^\/body ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = request.name + " who you trying to kid?";
      callback(true, msg, []);
      return msg;
    }

    for (cmd in commands) {
      if (commands[cmd].status == "draft") {
        commands[cmd]["body"] = val[1];
        updateBody(commands[cmd]);
                
        var msg = "Email body recieved, type /send to send email";

        callback(true, msg, []);
        return msg;
      }
    }
  }
}

function sendEmailCmd(request, bots, isMod, callback) {
  var regex = /^\/send$/;
  var reqText = request.text;
  //var to, subject, text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);
    var to, subject, text;


//  for (cmd in commands) {
//if (commands[cmd].status = "draft") {
       
 // for (cmd in commands) {


var Transport = nodemailer.createTransport({


service: 'gmail',
auth: {
user: 'alexdeabot@gmail.com',
pass: '113Hopest'
}
});

for (cmd in commands) {
//if (commands[cmd].status == "draft") {

to = commands[cmd]["to"];
subject = commands[cmd]["subject"];
text = commands[cmd]["body"];

//cron.schedule("* * * * *", function(){ 
//console.log("---------------------"); 
//console.log("Running Cron Job"); 


var mailOptions = {


to: to,
from: 'alexdeabot@gmail.com',
subject: subject,
generateTextFromHTML: true,
text: text
};

//for (cmd in commands) {
if (commands[cmd].status == "draft") {
updateSent(commands[cmd]);
moveSentDoc(commands[cmd]);
//deleteDoc(commands[cmd]);
//console.log(response);
var msg = "Email sent";
callback(true, msg, []);


Transport.sendMail(mailOptions, function(error, response) { 
if (error) { // throw error; //{
console.log(error);
//var msg = "There was an error sending email.";
//callback(true, msg, []);
//return msg;
}
console.log(response);

Transport.close();
});

return msg;


}
}
}
}

//*********


/* var count = 0; 
var intervalObject = setInterval(function () { 
count++; 
console.log(count, 'seconds passed'); 
Transport.sendMail(mailOptions, function(error, response) {


if (count == 5) { 
console.log('exiting'); 
clearInterval(intervalObject); 
  } 

if (error) {
console.log(error);

} else {
console.log(response);
}

Transport.close();
});
//});
}, 10000); */
