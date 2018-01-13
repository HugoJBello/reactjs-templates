var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');

var con = require('../mysql_connection/connection');

router.get('/get_list_images',(req,res) => {
    con.query("SELECT * FROM image", function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
});

router.get('/get_list_images/:limit', function(req, res, next) {
    con.query("SELECT * FROM image order by date_taken desc limit " + req.params.limit, function (err, result, fields) {
      if (err) {
        console.log(err);
        console.log("error in mysql");
      };
      res.json(result);
    });
});

router.get('/images_base64/limit=:limit', function(req, res, next) {
    con.query("SELECT * FROM image order by date_taken desc limit " + req.params.limit, function (err, result, fields) {
      if (err) {
        console.log(err);
        console.log("error in mysql");
      };
      for (var i=0;i<result.length;i++){
        result[i].base64 = base64_encode(result[i].path);
      }
      res.json(result);
    });
});

router.get('/images_base64/limit=:limit/skip=:skip', function(req, res, next) {
    if(req.params.limit && req.params.skip){
      con.query("SELECT * FROM image order by date_taken desc limit " + req.params.limit + " OFFSET " + req.params.skip, function (err, result, fields) {
        if (err) {
          console.log(err);
          console.log("error in mysql");
        };
        for (var i=0;i<result.length;i++){
          result[i].base64 = base64_encode(result[i].path);
        }
        res.json(result);
      });
   } else {
     res.json(null);
   }
});

router.get('/images_base64_date/limit=:limit/skip=:skip/day=:day', function(req, res) {
    if(req.params.limit &&  req.params.day){
      con.query('SELECT * FROM image where date_taken LIKE "'+ req.params.day +'%" order by date_taken desc limit ' + req.params.limit + " OFFSET " + req.params.skip, function (err, result, fields) {
        if (err) throw err;
        for (var i=0;i<result.length;i++){
          result[i].base64 = base64_encode(result[i].path);
        }
        console.log(result);
        res.json(result);
      });
   } else {
     res.json(null);
   }
});

router.get('/images_base64_today/limit=:limit/skip=:skip', function(req, res, next) {
    if(req.params.limit && req.params.skip){
      con.query("SELECT * FROM image where date_taken = curdate() order by date_taken desc limit " +req.params.limit + " OFFSET " + req.params.skip, function (err, result, fields) {
        if (err) {
          console.log(err);
          console.log("error in mysql");
        };
        for (var i=0;i<result.length;i++){
          result[i].base64 = base64_encode(result[i].path);
        }
        res.json(result);
      });
   } else {
     res.json(null);
   }
});

// function to encode file data to base64 encoded string
function base64_encode(file) {
    try{
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
    } catch (err) {
      return null;
    }
}

module.exports = router;