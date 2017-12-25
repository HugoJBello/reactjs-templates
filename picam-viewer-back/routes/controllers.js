var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3141592625",
  database: "picam_app"
});

/* GET home page. */
router.get('/get_list_images', function(req, res, next) {
    con.query("SELECT * FROM image", function (err, result, fields) {
      if (err) throw err;
      res.json(result);
      console.log(result);
    });
});

router.get('/get_list_images/:limit', function(req, res, next) {
    con.query("SELECT * FROM image order by date_taken limit " + req.params.limit, function (err, result, fields) {
      if (err) throw err;
      res.json(result);
      console.log(result);
    });
});

router.get('/images_base64/:limit', function(req, res, next) {
    con.query("SELECT * FROM image order by date_taken limit " + req.params.limit, function (err, result, fields) {
      if (err) throw err;
      for (var i=0;i<result.length;i++){
      //  console.log(result[i].path);
        result[i].base64 = base64_encode(result[i].path);
      //  console.log(result[i].base64);
      }
      res.json(result);
    });
});

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

module.exports = router;
