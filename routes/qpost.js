var express = require('express');
var router = express.Router();
const global = require('../models/alldata');

/* GET home page. */


router.get('/', function(req, res, next) {
    res.render('qpost',{email:global.eml});
});



module.exports = router;