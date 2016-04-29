var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// quandl api key is c_mESQnKLK9DxpsVU7pz
module.exports = router;
