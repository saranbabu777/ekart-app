var express = require('express');
var router = express.Router();
var dbModule = require('../dbmodule.js');
/*Create products collection for the first time*/
// dbModule.products();
/* GET select all products */
router.get('/', function (req, res, next) {
  dbModule.listProducts("", res);
});
/* POST search products */
router.post('/search', function (req, res, next) {
  dbModule.listProducts(req.body.query, res);
});
/* POST filter products */
router.post('/filter', function (req, res, next) {
  dbModule.filterProducts(req.body.filter, res);
});
/* POST update products */
router.post('/update', function (req, res, next) {
  dbModule.updateProduct(req.body.pid, req.body, res);
});
/* GET select product by id */
router.get('/:id', function (req, res, next) {
  dbModule.getProduct(req.params.id, res);
});

module.exports = router;
