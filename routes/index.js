var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// controller routes
const auth = require('../controller/auth');

router.post('/login', auth.login);

module.exports = router;
