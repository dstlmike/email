//
var mongoDB     = require('mongodb').MongoClient;
var db = require('mongodb').Db
var bot = require('../bot.js');
//var connection_string = 'mongodb://dstl%5Fmike1%40hotmail%2Ecom:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

//var connection_string = 'mongodb://0.0.0.0:27017/test';
var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';


//var connection_string = 'mongodb+srv://dstlmike1:308boonave@cluster0-esmha.mongodb.net/test';
//var connection_string = 'mongodb://0.0.0.0:27017/sampledb';
//var connection_string = 'mongodb://' + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_SERVICE_HOST + ':' + process.env.MONGODB_SERVICE_PORT + '/' + process.env.MONGODB_DATABASE;


//if(process.env.MONGODB_PASSWORD){
  //connection_string = 'mongodb://' + process.env.MONGODB_USER + ":" +
  //process.env.MONGODB_PASSWORD + "@" +
  //process.env.MONGODB_SERVICE_HOST + ':' +
  //process.env.MONGODB_SERVICE_PORT + '/' +
  //process.env.MONGODB_DATABASE;
//}

//var connection_string = mongodb+srv://dstl%5Fmike1%40hotmail%2Ecom:308boonave@cluster0-esmha.mongodb.net/test?retryWrites=true&w=majority

if(process.env.MONGODB_PASSWORD){
  // //connection_string = 'mongodb://dstl%5Fmike1%40hotmail%2Ecom:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority' + process.env.MONGODB_USER + ":" +
  connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority' + process.env.MONGODB_USER + ":" +
  process.env.MONGODB_PASSWORD + "@" +
  process.env.MONGODB_SERVICE_HOST + ':' +
  process.env.MONGODB_SERVICE_PORT + '/' +
  process.env.MONGODB_DATABASE;
}


function connect(callback){
  mongoDB.connect(connection_string, function(err, db) {
    if(err) throw err;
    callback(db);
  });
}


exports.getAllDocuments = function(collection, callback) {
  mongoDB.connect(connection_string, function(err, db) {
    if(err) throw err;
    var allDocs = db.collection(collection).find().toArray(function(err, docs) {
      callback(docs);
      //db.close();
    });
  });
}

//---- Success
exports.getSuccessDocument = function(collection, matchHash, data, callback) {
  mongoDB.connect(connection_string, function(err, db) {

    if(err) throw err;
    


  // var cursor = db.collection('details').find();
//var results = cursor; //.each();
//results.toArray(iterateFunc);
//function getIt() {
//results.toArray(function(err, docs) { //, errorFunc);

//db.collection('details').find(matchHash).toArray(function(err, docs) {
//if(err) throw err;
/*
if (docs < 1) {
additFunc();
//db.collection('details').insertOne(data, function(err, collection){
       // if (err)
//throw err;
//});
}
if (docs) {
console.log(JSON.stringify(doc, null, 4));
}
*/
//});
//}

function additFunc() {
//results.forEach(iterateFunc, errorFunc);



db.collection('details').insert(data, function(err, collection){
        if (err)
throw err;
console.log(data.name + "\n User added");
});

}

function iterateFunc() {
db.collection('details').find(name).toArray(function(err, doc) { //, errorFunc);
//var docs = res;
//if (result < 1) { //["name"] != matchHash) {
//if(!callback) {
//additFunc();
//}
if (doc) { // != null) { //["name"] = matchHash) {
console.log(JSON.stringify(result, null, 4)); //docs, null, 4));
}
if (!doc) {
additFunc();
}
});
//additFunc();
}
function errorFunc(error) {
console.log(error);
}

iterateFunc();
  });
}


//*****
exports.getSuccessDocuments = function(collection, matchHash, callback) {
  mongoDB.connect(connection_string, function(err, db) {

    if(err) throw err;
    
  //  var ret = db.collection('details').find(matchHash);
  //  ret.toArray(function(err, docs) {
    db.collection('details').find(matchHash).each(function(err, doc) {
     //if(err) throw err; 
      //if (!callback) {
        //additFunc();
       // console.log("error");
        //throw err;
        //var html = fs.readFileSync(path.join(__dirname + "/signup_success.html")); 
      //}
      if (doc) { // != null) { //callback) {
        //callback(docs);
        console.log(doc)
        //cmdit();
        //var html = fs.readFileSync(path.join(__dirname + "/index.html")); 
       // console.log('displaying commands at /commands_success');
        //console.log(docs); 
        //db.close();
      }
      
    });
    /*
   var ret = db.collection(collection).find().toArray(function(err, docs) {
     if (docs) {
      callback(docs);
      db.close();
       }
    });
    */
  });
}

//----


exports.findDocs = function(collection, matchHash, callback) {
  connect(function(db){
    var cursor = db.collection(collection).find(matchHash);
    var ret = [];
    cursor.each(function(err, doc){
      if(doc != null)
        ret.push(doc);
      else
        callback(ret);
    });
  });
}

exports.addDoc = function(collection, doc, callback) {
  connect(function(db){
    var ret = db.collection(collection).insert(doc, function(err, result){
      if (callback)
        callback(result);
      db.close();
    });
  });
}


exports.moveOneDoc = function(collection, doc, callback) {
connect(function(db){
//var cursor = db.collection(collection).find(matchHash).each(function(err, doc){ 
var ret = db.collection(collection).insert(doc, function(err, result){
//cursor;
if (callback)
callback(result);
db.close();
});
});
}


exports.updateOneDoc = function(collection, findJson, updateJson, callback) {
  connect(function(db){
    var ret = db.collection(collection).updateOne(findJson, updateJson, function(err, result) {
      if (callback)
        callback(result);
      db.close();
    })
  });
}

exports.removeOneDoc = function(collection, findJson, callback) {
  connect(function(db){
    var ret = db.collection(collection).deleteOne(findJson, function(err, result){
      if (callback)
        callback(result);
      db.close();
    });
  });
}

exports.countDocs = function (collection, callback) {
  connect(function(db){
    var ret = db.collection(collection).count(function(err, result){
      if (callback)
        callback(result);
      db.close();
    });
  });
}

exports.randomDoc = function(collection, callback) {
  connect(function(db){
    var coll = db.collection(collection);
    cursor = coll.find({});

    coll.count(function(err, count){
      var random = Math.floor(Math.random() * count);
      cursor.skip(random);
      cursor.limit(1);
      cursor.each(function(err, doc){
        if(doc != null){
          callback(doc);
          return;
        }
      });
    });
  });
}


//************
exports.commandDocs = function(collection, callback) {
  connect(function(db){
    var coll = db.collection(collection);
    cursor = coll.find({});

    coll.count(function(err, count){
     // var random = Math.floor(Math.random() * count);
     // cursor.skip(random);
    //  cursor.limit(1);
      cursor.each(function(err, docs){
        if(docs != null){
          callback(docs);
          return;
        }
      });
    });
  });
}



//***********
exports.getAllDocumentsDb = function(collection, callback) {
  connect(function(db){
    var allDocs = db.collection('user_triggers').find({}).toArray(function(err, result) {
allDocs;
if (callback)
      callback(result);
      db.close();
    });
  });
}

exports.answerAllDocuments = function(collection, callback) {
connect(function(db){
//var name = commands[cmd].name;
//var regex = commands[cmd].regex;
//var id = commands[cmd]._id

//cursor = db.collection(collection).find();
//while ( cursor.hasNext() ) {
   //printjson( cursor.next() );

var query = {};
  var cursor = db.collection('user_triggers').find(query).toArray(function(err, result) {
    if (err) throw err;
cursor;
    console.log(result);
bot.sendDelayedMessage;
    db.close();
});
});
}


exports.randomDocs = function(collection, callback) {
  connect(function(db){
    var coll = db.collection('user_triggers');
    var srts = { name: 1 };
    cursor = coll.find({});
    //cursors = cursor.toArray({});

      //coll.sort({name: 1});
      coll.count(function(err, count){
      
      //var random = Math.floor(Math.random() * count);
      //cursor.skip(random);
      //cursor.limit(1);
      //var mysort = {name:1};
      //cursor.sort(name){
      //cursor.sort(mysort).toArray(function(err, doc){
      cursor.each(function(err, doc){
      //cursor.sort({'commands[cmd].name'}:1)
        if(doc != null){
       
          callback(doc);
          return;
        }
      });
    });
  });
}


//---------

exports.addSentDoc = function(collection, doc, callback) {
  connect(function(db){
    var ret = db.collection('sent_emails').insert(doc, function(err, result){
      if (callback)
        callback(result);
      db.close();
    });
  });
}
