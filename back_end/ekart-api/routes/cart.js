var express = require('express');
var router = express.Router();
var dbModule = require('../dbmodule.js');
/* GET select all products in cart based on username */
router.get('/:username', function (req, res, next) {
  dbModule.getCart(req.params.username, res);
});
/* POST add to cart */
router.post('/add', function (req, res, next) {
  dbModule.addToCart(req.body, res);
});
/* POST add to cart */
router.post('/update', function (req, res, next) {
  dbModule.updateCart(req.body, res);
});
/* POST update cart from guest*/
router.post('/update-user', function (req, res, next) {
  dbModule.updateCartUser(req.body, res);
});
/* POST count cart items */
router.post('/cart-count', function (req, res, next) {
  dbModule.cartCount(req.body.username, res);
});
/* POST delete from cart */
router.post('/delete', function (req, res, next) {
  dbModule.deleteCart(req.body, res);
});

module.exports = router;
