var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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

module.exports = router;
