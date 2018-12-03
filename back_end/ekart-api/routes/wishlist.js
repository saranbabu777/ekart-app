var express = require('express');
var router = express.Router();
var dbModule = require('../dbmodule.js');
/* GET select all products in wishlist based on username */
router.get('/:username', function (req, res, next) {
  dbModule.getWishlist(req.params.username, res);
});
/* POST add to wishlist*/
router.post('/add', function (req, res, next) {
  dbModule.addToWishlist(req.body, res);
});
/* POST delete from wishlist */
router.post('/delete', function (req, res, next) {
  dbModule.deleteWishlist(req.body, res);
});

module.exports = router;
