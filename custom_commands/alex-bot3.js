var commands;
var userCommands = [emailCmd, subjectCmd, editCmd, removeCmd];

var db = require('../modules/db.js');
var db_table = 'user_email';
var moment = require('moment'); 
var date = moment().utcOffset(-300).format('LLLL');


getAllCommands();
exports.modName = "Custom Commands";

function getAllCommands() {
  db.getAllDocuments(db_table, function(res){
    commands = res;
  });
}

exports.getAllCommands = function(){
db.getAllDocuments(db_table, function(res){
    commands = res;
  });
}

function answerAllDocuments(cmd, callback) {
db.answerAllDocuments(cmd, callback);
}

function getAllDocumentsDb(cmd, callback) {
db.getAllDocumentsDb(cmd, callback);
}

function addCmdToDB(cmd, callback) {
  db.addDoc(db_table, cmd, callback);
}

function updateCmdDB(cmd, updateJson, callback){
  var findHash = {
    "name": cmd["name"]
  }

  db.updateOneDoc(db_table, findHash, updateJson, callback);
}



function subjectCmdDB(cmd, callback) {
  var subjectHash = {
    $set: {
      "subject": cmd["subject"]
    }
  };

  updateCmdDB(cmd, subjectHash, callback);
}

//-------


//-------

function changeMsgCmdDB(cmd, callback) {
  var updateHash = {
    $set: {
      "message": cmd["message"]
    }
  };

  updateCmdDB(cmd, updateHash, callback);
}

function deleteCmdFromDB(cmd, callback){
  var findJson = { "name": cmd["name"] };

  db.removeOneDoc(db_table, findJson);
}

//exports
exports.checkCommands = function(dataHash, callback) {
  for (cmd in commands) {
    cmd = commands[cmd];
    //hard coded temporarily ... maybe permanently ... losing motivation to work on this
    if(cmd.name == 'cc' && dataHash.currentBot.type == 'hp')
      continue;
    var cmdReg = new RegExp(cmd.regex, "i");
    if (dataHash.request.text && cmdReg.test(dataHash.request.text)){
      var val = cmdReg.exec(dataHash.request.text);

      callback(true, cmd.message, cmd.attachments);
      break;
    }
  }


  for (cmd in userCommands) {
    var test = userCommands[cmd](dataHash.request, dataHash.bots, dataHash.isMod, callback);
    if (test)
      return test;
  }
}

exports.setAll = function(cmdHash) {
  commands = cmdHash;
}

exports.getAll = function() {
  return commands;
}

exports.getCmdListDescription = function () {
  cmdArr = [
    {cmd: "/cmd add 'name' 'message'", desc: "Add a new custom command", mod: true},
    {cmd: "/cmd describe 'name' 'description'", desc: "Adds a description to a custom command for this command list", mod: true},
    {cmd: "/cmd edit 'name' 'message with tags'", desc: "Changes the response of an existing command", mod: true},
    {cmd: "/cmd remove 'name'", desc: "Deletes a custom command", mod: true}
  ];

  for (cmd in commands) {
    cmdArr.push({cmd: "/" + commands[cmd].name, desc: commands[cmd].description});
  }

  return cmdArr;
}




function emailCmd(request, bots, isMod, callback) {
  var regex = /^\/email (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);
    

    if (!isMod) {
      var msg = "You don't have permission to add commands"
      callback(true, msg, []);
      return msg;
    }

    for (cmd in commands) {
      if (commands[cmd].draft) {
        deleteCmdFromDB(commands[cmd]);
        commands.splice(cmd, 1);
      



    var cmdHash = {
      name: val[1].toLowerCase(),
      draft: "draft$",
      //regex: "^\/" + val[1] + "$",
      //message: val[2],
      date: date
    };

    commands.push(cmdHash);
    addCmdToDB(cmdHash);
    var msg = "Type subject + email subject";
    callback(true, msg, []);
    return msg;
      }   
    }
  }
}

function subjectCmd(request, bots, isMod, callback) {
  var regex = /^\/subject ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to describe commands"
      callback(true, msg, []);
      return msg;
    }

    for (cmd in commands) {
      if (commands[cmd].draft) {
        commands[cmd]["subject"] = val[1];
        subjectCmdDB(commands[cmd]);

        var msg = val[1] + " description updated";
        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + " doesn't exist";
    callback(true, msg, []);

    return msg;
  }
}

//----------


//----------

function removeCmd(request, bots, isMod, callback) {
  var regex = /^\/cmd remove (.+)/i;
  var reqText = request.text.toLowerCase();

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to remove commands"
      callback(true, msg, []);
      return msg;
    }

    val[1] = val[1].toLowerCase();

    for (cmd in commands) {
      if (commands[cmd].name == val[1]) {
        deleteCmdFromDB(commands[cmd]);
        commands.splice(cmd, 1);
        var msg = val[1] + " command deleted for ever and ever and ever and ... you get it.";
        callback(true, msg, []);
        return msg;
      }
    }

    callback(true, "No such command.", []);
    return msg;
  }
}


function editCmd(request, bots, isMod, callback) {
  var regex = /^\/cmd edit (.+?) ([\s\S]+)/i;
  var reqText = request.text;

  if (regex.test(reqText)){
    var val = regex.exec(reqText);

    if (!isMod) {
      var msg = "You don't have permission to edit commands"
      callback(true, msg, []);
      return msg;
    }

    val[1] = val[1].toLowerCase();
    for (cmd in commands) {
      if (commands[cmd].name == val[1]) {
        commands[cmd].message = val[2];
        changeMsgCmdDB(commands[cmd]);

        var msg = val[1] + " message updated.";
        callback(true, msg, []);
        return msg;
      }
    }

    var msg = val[1] + "doesn't exist";
    callback(true, msg, []);
    return msg;
  }
}
