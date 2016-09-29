var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET game page */
router.get('/game/:roomId', function(req, res, next){
  res.render('game')
})

module.exports = router;
