var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('distributor-management', {
    title: 'Distributor management'
  });
});

router.get('/distributor-management', function (req, res, next) {
  res.render('distributor-management', { title: 'Distributor management' });
});

module.exports = router;