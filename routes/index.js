var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// controller routes
const auth = require('../controllers/auth');

router.post('/adminRegister', auth.adminRegister);
router.post('/adminLogin', auth.adminLogin);

module.exports = router;
