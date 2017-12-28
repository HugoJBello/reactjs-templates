var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const jwtAuthz = require('express-jwt-authz');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3141592625",
  database: "picam_app"
});

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://cam-viewer-hjbello.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'picam-viewer-back',
    issuer: "https://cam-viewer-hjbello.eu.auth0.com/",
    algorithms: ['RS256']
});
const checkScopes = jwtAuthz([ 'read:messages' ]);
router.use(cors());
//router.use(jwtCheck);
//router.use(checkScopes);


router.get('/get_list_images',jwtCheck, (req,res) => {
    con.query("SELECT * FROM image", function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
});

router.get('/get_list_images/:limit', function(req, res, next) {
    con.query("SELECT * FROM image order by date_taken limit " + req.params.limit, function (err, result, fields) {
      if (err) {
        console.log(err);
        console.log("error in mysql");
      };
      res.json(result);
    });
});

router.get('/images_base64/limit=:limit', function(req, res, next) {
    con.query("SELECT * FROM image order by date_taken limit " + req.params.limit, function (err, result, fields) {
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
      con.query("SELECT * FROM image limit " + req.params.limit + " OFFSET " + req.params.skip, function (err, result, fields) {
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

router.get('/images_base64_date/limit=:limit/skip=:skip/day=:day', function(req, res, next) {
    if(req.params.limit && req.params.skip && req.params.day){
      con.query("SELECT * FROM image where date_taken = "+ req.params.day + " limit " + req.params.limit + " OFFSET " + req.params.skip, function (err, result, fields) {
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

router.get('/images_base64_today/limit=:limit/skip=:skip', function(req, res, next) {
    if(req.params.limit && req.params.skip){
      con.query("SELECT * FROM image where date_taken = curdate() limit " +req.params.limit + " OFFSET " + req.params.skip, function (err, result, fields) {
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
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

module.exports = router;
