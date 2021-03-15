var express = require('express');
const global = require('../models/alldata');
//const toch = require('../models/alldata');
var router = express.Router();
/* GET home page. */

var topicss = [];
router.get('/', function(req, res, next) {

  
  var sub = [];
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://akash:akashvel98%40kum@cluster0.9al2j.mongodb.net";
  var dis =[{comment:"",replyby:""}];
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  //Find all documents in the customers collection:
  dbo.collection("alltopics").find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    for(var i=0;i<result.length;i++){
      // console.log(result[i].topic);
      // console.log(result[i].description);
      sub.push(result[i].topic);
      topicss.push({"name":result[i].topic});
      console.log(topicss);
    }
    // dbo.collection("comments").find({}).toArray(function(err,result){
    //     for(var j=0;j<result.length;j++){
    //       console.log(result[j].topic);
    //       console.log(result[j].replyby);
    //       console.log(result[j].comment);
    //     }
    // });

    db.close();
    res.render('index', { title:'Login',loginstatus:'Please Login',sub:topicss,discussiontoppic:"Select Topic in left panel",dis:dis});
  });
  });

  //var sub = [{name:"akash"},{name:"vel"}];
  
});

router.post('/btnclk', function(req, res, next) {
  //var sub = [{name:"akash"},{name:"vel"}];
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://akash:akashvel98%40kum@cluster0.9al2j.mongodb.net";
  var dis = [];
  var nme = req.body.ak;
  var descr = { description:nme };
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  
  // dbo.collection("alltopics").find({}).toArray(function(err,result){
  //   for(var i=0;i<result.length;i++){
  //     if(result[i].description==nme){
  //       console.log(res);
  //     }
  //   }
  // });

  dbo.collection("comments").find({}).toArray(function(err,result){
    for(var j=0;j<result.length;j++){
      if(result[j].topic==nme){
        dis.push({"replyby":result[j].replyby});
        dis.push({"comment":result[j].comment});
      }
    }
    res.render('index', { title:'Login',loginstatus:'Please Login',sub:topicss,discussiontoppic:nme,dis:dis});
  });

  db.close();
  
  });
});

router.post('/userlogin', function (req, res) {
  var dis =[{comment:"",replyby:""}];
  var email = req.body.email;
  var password = req.body.password;
  var dis =[{comment:"",replyby:""}];
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://akash:akashvel98%40kum@cluster0.9al2j.mongodb.net";

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { email: email,password:password};
    dbo.collection("customers").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      if(result.length>0){
        global.toch(email);
        res.render('forum.ejs',{email:global.eml,sub:topicss,selectedtopic:"Select The Topic In Left Panel",dis:dis});
      }
      else{
        var sub = [{name:"akash"},{name:"vel"}];
        res.render('index.ejs', { title:'Login',loginstatus:'User Not Found',sub:topicss,discussiontoppic:"",dis:dis});
      }
      db.close();
    });
  });
});

router.post('/usersignup', function(req, res, next) {
  var email = req.body.semail;
  var password = req.body.spassword;
  var confirmpassword = req.body.scpassword;
  var tosend = "";
  if(password==confirmpassword){
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://akash:akashvel98%40kum@cluster0.9al2j.mongodb.net";
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  
  var query = { email: email };
    dbo.collection("customers").find(query).toArray(function(err, result) {
      if (err) throw err;

      if(result.length>0){
          tosend = "Already MailID Found";
          res.send(tosend);
      }
      else{
        var myobj = { email: email, password: password };
        dbo.collection("customers").insertOne(myobj, function(err, res) {
          if (err) throw err;
          db.close();
        });
      }
      res.send("Successfully SignedUp");
  });
  });
  }
  else{
    tosend = "Password Mismatch";
    res.send(tosend);
  }
});  
  /*if(password==confirmpassword){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://akash:akashvel98%40kum@cluster0.9al2j.mongodb.net";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { email: email, password: password };
    dbo.collection("customers").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("User Added");
      db.close();
    });
    res.send("Successfully SignedUp");
    });
  }
  else{
    res.send("Password Mismatch");
  }*/
  


router.post('/okok', function(req, res, next) {
  res.render('qpost.ejs',{email:global.eml});
});


router.post('/forumtopic', function(req, res, next) {
  var nme = req.body.forumtopicclick;
  global.topicupload(nme);
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://akash:akashvel98%40kum@cluster0.9al2j.mongodb.net";
  var dis = [];
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  //var nme = req.body.ak;
  dbo.collection("comments").find({}).toArray(function(err,result){
    for(var j=0;j<result.length;j++){
      if(result[j].topic==nme){
        dis.push({"replyby":result[j].replyby});
        dis.push({"comment":result[j].comment});
      }
    }
    res.render('forum.ejs',{email:global.eml,sub:topicss,selectedtopic:nme,dis:dis});
    //res.render('index', { title:'Login',loginstatus:'Please Login',sub:topicss,discussiontoppic:nme,dis:dis});
  });

  db.close();
  
  });
  //var nme = req.body.forumtopicclick;
  //global.topicupload(nme);
  //res.render('forum.ejs',{email:global.eml,sub:topicss,selectedtopic:nme});
});

router.post('/commentbutton', function(req, res, next) {
  var author = global.eml;
  var topicselected  = global.topicselectedinforum;
  var comment = req.body.commenttext;
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://akash:akashvel98%40kum@cluster0.9al2j.mongodb.net";
  var dis = [];
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { topic:topicselected,replyby:author,comment:comment};
  dbo.collection("comments").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("Commented");
    
  });

  dbo.collection("comments").find({}).toArray(function(err,result){
    for(var j=0;j<result.length;j++){
      if(result[j].topic==topicselected){
        dis.push({"replyby":result[j].replyby});
        dis.push({"comment":result[j].comment});
      }
    }
    res.render('forum.ejs',{email:global.eml,sub:topicss,selectedtopic:topicselected,dis:dis});
    db.close();
    //res.render('index', { title:'Login',loginstatus:'Please Login',sub:topicss,discussiontoppic:nme,dis:dis});
  });

  });
  //res.send(author +" "+topicselected+" "+comment);
});

router.post('/question', function(req, res, next) {
  //res.send(req.body.topic+" "+req.body.description);
  var topic = req.body.topic;
  var description  = req.body.description;
  var email = global.eml;

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://akash:akashvel98%40kum@cluster0.9al2j.mongodb.net";

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

  var query = { topic: topic };
  dbo.collection("alltopics").find(query).toArray(function(err, result) {
    if(result.length>0){
      res.send("Already "+topic+" is Discussed in forum");
    }
    else{
      var myobj = { topic:topic,description: description,email:email};
      dbo.collection("alltopics").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
      });
      res.send(topic+" Added Successfully");
    }
  });

  // var myobj = { topic:topic,description: description,email:email};
  // dbo.collection("alltopics").insertOne(myobj, function(err, res) {
  //   if (err) throw err;
  //   console.log("1 document inserted");
  //   db.close();
  // });
  });

  //res.render('qpost.ejs',{email:global.eml});
});



module.exports = router;
