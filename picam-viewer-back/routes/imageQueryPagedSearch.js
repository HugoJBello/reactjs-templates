var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var con = require('../mysql_connection/connection');

const entriesPerPage=10;

router.get('/images_base64_date_paged/day=:day/page=:page', function(req, res) {
    if(req.params.page &&  req.params.day){
      limit = entriesPerPage;
      offset = entriesPerPage*(req.params.page-1);
      con.query('SELECT * FROM image where date_taken like "'+ req.params.day +'%"  and id > ' + offset + " limit " + limit, function (err, result, fields) {
        if (err) throw err;
        for (var i=0;i<result.length;i++){
          result[i].base64 = base64_encode(result[i].path);
        }
        var response = {images:result};
        con.query('SELECT count(*) FROM image where date_taken = "'+ req.params.day + '"', function (err, result, fields) {
          response.numberOfPages = Math.floor(result[0]['count(*)']/entriesPerPage)+1;
          response.numberOfItems = result[0]['count(*)'];
          response.entriesPerPage = entriesPerPage; 
          res.json(response);
        });
      });
   } else {
     res.json(null);
   }
});

router.get('/images_base64_paged/page=:page', function(req, res) {
    if(req.params.page){
      limit = entriesPerPage;
      offset = entriesPerPage*(req.params.page-1);
      con.query('SELECT * FROM image where id > ' + offset + " limit " + limit, function (err, result, fields) {
        if (err) throw err;
        for (var i=0;i<result.length;i++){
          result[i].base64 = base64_encode(result[i].path);
        }
        var response = {images:result};
        con.query('SELECT count(*) FROM image ', function (err, result, fields) {
          response.numberOfPages = Math.floor(result[0]['count(*)']/entriesPerPage)+1;
          response.numberOfItems = result[0]['count(*)'];
          response.entriesPerPage = entriesPerPage;
          res.json(response);
        });
      });
   } else {
     res.json(null);
   }
});

router.get('/images_base64_paged_files/page=:page', function(req, res) {
  if(req.params.page){
    limit = entriesPerPage;
    offset = entriesPerPage*(req.params.page-1);
    con.query('SELECT * FROM image where id > ' + offset + " limit " + limit, function (err, result, fields) {
      if (err) throw err;
      for (var i=0;i<result.length;i++){
        result[i].base64 = base64_encode(result[i].path);
      }
      var response = result;
      res.json(response);
    });
 } else {
   res.json(null); 
 }
});

router.get('/images_base64_date_paged_files/day=:day/page=:page', function(req, res) {
 if((req.params.day!==undefined) && (req.params.page!==undefined)){
    limit = entriesPerPage;
    offset = entriesPerPage*(req.params.page-1);
    con.query('SELECT * FROM image where date_taken LIKE  "'+ req.params.day +'%"  and id > ' + offset + " limit " + limit, function (err, result, fields) {
      if (err) throw err;
      for (var i=0;i<result.length;i++){
        result[i].base64 = base64_encode(result[i].path);
      }
      var response = result;
      res.json(response); 
    });
 } else {

   res.json(null);
 }
});

router.get('/images_base64_parameters/', function(req, res) { 
      con.query('SELECT count(*) FROM image ', function (err, result, fields) {
        response.numberOfPages = Math.floor(result[0]['count(*)']/entriesPerPage)+1;
        response.numberOfItems = result[0]['count(*)'];
        response.entriesPerPage = entriesPerPage;
        res.json(response);
      });
});

router.get('/image_recorded/:filename', function(req, res) { 
  console.log("---------");  
  con.query('SELECT * FROM image where filename =  "'+ req.params.filename+'" limit 1', function (err, result, fields) {
      if (err) throw err;    
      try {
        console.log(result[0]);  

        var file = result[0].path;
        // read binary data
        var bitmap = fs.readFileSync(file); 
        console.log("---------");  

        console.log(file); 
        // convert binary data to base64 encoded string
        res.contentType('image/jpeg');
        res.end(bitmap,"binary");
      } catch (err) {
        return null;
      }      
    });
    
});


router.get('/images_base64_parameters_date/day=:day', function(req, res) { 
  con.query('SELECT count(*) FROM image where date_taken LIKE "'+ req.params.day + '"%', function (err, result, fields) {
    response.numberOfPages = Math.floor(result[0]['count(*)']/entriesPerPage)+1;
    response.numberOfItems = result[0]['count(*)'];
    response.entriesPerPage = entriesPerPage;
    res.json(response);
  });
});

// function to encode file data to base64 encoded string
function base64_encode(file) {
  try {
    // read binary data
    var bitmap = fs.readFileSync(file); 
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
  } catch (err) {
    return null;
  }

}

module.exports = router;
