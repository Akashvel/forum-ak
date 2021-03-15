var express = require('express');
const global = require('../models/alldata');
var router = express.Router();
/* GET home page. */

var topicss = [];
router.get('/', function(req, res, next) {
//     var sub = [];
//   var MongoClient = require('mongodb').MongoClient;
//   var url = "mongodb://localhost:27017/";

//   MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   //Find all documents in the customers collection:
//   dbo.collection("alltopics").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     //console.log(result);
//     for(var i=0;i<result.length;i++){
//       console.log(result[i].topic);
//       sub.push(result[i].topic);
//       topicss.push({"name":result[i].topic});
//       console.log(topicss);
//     }
//     db.close();
//     res.render('forum',{email:global.eml,sub:topicss});
//     //res.render('index', { title:'Login',loginstatus:'Please Login',sub:topicss});
//   });
//   });
    
});



module.exports = router;