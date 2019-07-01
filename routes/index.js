var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// controller routes
const auth = require('../controllers/auth');
const devotions = require('../controllers/devotions');

router.post('/adminRegister', auth.adminRegister);
router.post('/adminLogin', auth.adminLogin);
router.post('/getDevotions', devotions.getDevotions);
router.post('/insertDevotions', devotions.insertDevotion);
router.post('/updateDevotion', devotions.updateDevotion);

module.exports = router;
