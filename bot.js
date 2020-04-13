/*global init*/

//load modules
var sysCommands  = require('./modules/sys-commands');
var db           = require('./modules/db.js');
var mods         = require('./modules/mods');
var commandList  = require('./modules/command-list');
var rooms        = require('./modules/rooms');

//commands with custom actions
var alexBot      = require('./custom_commands/alex-bot');
var flynnBot     = require('./custom_commands/flynn-bot-timesheet');
var emailBot     = require('./custom_commands/email');
var birthdayBot  = require('./custom_commands/birthdays');
var userCmds     = require('./custom_commands/user-commands');
var userMentions = require('./custom_commands/user-mentions');
var sysTriggers  = require('./custom_commands/system-triggers');
var quotes       = require('./custom_commands/quotes');
var atEveryone   = require('./custom_commands/at-everyone');
var funCommands  = require('./custom_commands/fun-commands');
var gif          = require('./custom_commands/giphy-api');
var catFact      = require('./custom_commands/cat-fact');
var urbanDict    = require('./custom_commands/urban-dictionary');
//var go         = require('./modules/server.js');
var fs           = require('fs');
var concat       = require('concat');
var cron = require('node-cron'); 
var express = require('express'); 
var nodemailer = require('nodemailer'); 
app = express(); 


var rooom;
getAllRooom();
function getAllRooom(){ 
db.getAllDocuments('rooms', function(res){ 
rooom = res; 
return rooom;
});
}

function getAll() { 
return rooom;
}


//load config
var config       = require('./config/config');
var HTTPS        = require('https');

//Temporarily just an array of the commands functions. Make an object with configuration values.
var checkCommandsHSH = [alexBot, flynnBot, emailBot, birthdayBot, mods, sysTriggers, userCmds, userMentions, sysCommands, atEveryone, funCommands, quotes, rooms, gif, catFact, urbanDict];

exports.init = function() {
  var req = this.req;
  init.initPage(req, function(body){
    this.res.writeHead(200, {"Content-Type": "text/html"});
    this.res.end(body);
  });
}



exports.respond = function(botRoom) {
  var request = JSON.parse(this.req.chunks[0]);

  var dataHash = {
    request:      request,
    currentBot:   rooms.getRoom(botRoom),
    isMod:        mods.isMod(request.user_id),
    bots:         rooms.getRooms(),
    funMode:      sysCommands.fun_mode(),
    owner:        config.env().owner
  };

  this.res.writeHead(200);
  this.res.end();

  if (dataHash.request.sender_type == 'bot') return;
  dataHash.request.text = dataHash.request.text.trim();

  if (!rooms.getRoom(botRoom).id && botRoom != 'config')
    return;

//if (rooms.getRoom(botRoom) == '282865de8ce30137567238148f') 
    //logName = botRoom.name;
   
  

  for(var lib in checkCommandsHSH) {
    checkCommandsHSH[lib].checkCommands(dataHash, function(check, result, attachments){
      if (check) sendDelayedMessage(result, attachments, rooms.getRoom(botRoom).id);
    });
//}
  }
}

exports.commands = function() {
  var cmdArr = [];

  console.log('displaying commands at /commands');

  for(var lib in checkCommandsHSH){
    var newCmds = checkCommandsHSH[lib].getCmdListDescription();
    if (newCmds)
      cmdArr = cmdArr.concat(newCmds);
  }

  var output = commandList.buildHTML(cmdArr, config.bot_name, config.nameit);
  //var output = cmdArr;
//var output = checkCommandsHSH[].getCmdListDescription();
 
//return cmdArr;
  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(output);
//this.res.end(cmdArr);
}

function sendDelayedMessage(msg, attachments, botID, logID, logName, nickName) {
  setTimeout(function() {
    postMessage(msg, attachments, botID, nickName);
    logMessage(msg, attachments, logID, logName);


  }, config.delay_time);
}

function postMessage(botResponse, attachments, botID, nickName) {
  var options, body, body1, botReq, nickName;



  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

/*
var nickName = '';
      if (botID == 'b6c42cc2a1bee3c38f07723d78') {
           nickName = 'Config';
           } else if (botID == '282865de8ce30137567238148f') {
           nickName = '308BoonBot';
           } else if (botID == '8631a4c35f0f0f250bd5d46f44') {
           nickName = 'FlynnBot';
           } else if (botID == '2184cee4d169628e83e82ee05f') {
           nickName = 'AshleyBot';
           } else {
             nickName = botID;
             }
*/


  body = {
    
    "attachments" : attachments,
    "bot_id"      : botID, 
    "text"        : botResponse
  };


/*
body1 = {
    
    "attachments" : attachments,
    "bot_id"      : "b6c42cc2a1bee3c38f07723d78",
    "text"        : botResponse
  };

      var logName = '';
      if (botID == 'b6c42cc2a1bee3c38f07723d78') {
           logName = 'Config';
           } else if (botID == '282865de8ce30137567238148f') {
           logName = '308BoonBot';
           } else if (botID == '8631a4c35f0f0f250bd5d46f44') {
           logName = 'FlynnBot';
           } else if (botID == '2184cee4d169628e83e82ee05f') {
           logName = 'AshleyBot';
           } else {
             logName = botID;
             }
  console.log('sending response to ' + logName + '\n' + botResponse);
*/

botReq = HTTPS.request(options, function(res) { 
console.log('Status: ' + res.statusMessage + ' Status code: ' + res.statusCode)


      //if (res.statusCode == 200) || (res.statusCode == 202) {
        //neat
//} else {
        //console.log('rejecting bad status code ' + res.statusCode);
      //}
  });


  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });

  botReq.end(JSON.stringify(body));
}



function logMessage(logResponse, attachments, botID, bot_id, logName, botRoom, callback) {
  var options, body, logReq, logName, logID, botRoom;
var botName;


  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };


for (room in rooom) {
room = rooom[room];
 
var logName = '';
      if (room.id == 'b6c42cc2a1bee3c38f07723d78') {
           logName = 'Config';
           } else if (id == '282865de8ce30137567238148f') {
           logName = '308BoonBot';
           } else if (id == '8631a4c35f0f0f250bd5d46f44') {
           logName = 'FlynnBot';
           } else if (id == '2184cee4d169628e83e82ee05f') {
           logName = 'AshleyBot';
           } else {
             logName = bot_id;
}  

  body = {

    "attachments" : attachments,
    "bot_id"      : "b6c42cc2a1bee3c38f07723d78",
   // "text"        : logName
    "text"        : logName + logResponse
    //"name"        : logName
  };





logReq = HTTPS.request(options, function(res) { 
console.log('Status: ' + res.statusMessage + ', Status code: ' + res.statusCode)
      //if (res.statusCode == 200) || (res.statusCode == 202) {
        //neat
//} else {
        //console.log('rejecting bad status code ' + res.statusCode);
      //}
  });


  logReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
    //logReq.end(JSON.stringify(err));
  });
  logReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });

logReq.on('end', function() {
this.res.writeHead(200,  'Content-Type': 'application/json');
This.res.end();
});

 // logReq(logName));



  logReq.end(JSON.stringify(body));
}


}


