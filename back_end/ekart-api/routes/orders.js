var express = require('express');
var router = express.Router();
var dbModule = require('../dbmodule.js');
/* GET select all orders of user */
router.get('/:username', function (req, res, next) {
  dbModule.listOrders(req.params.username, res);
});
/* GET select order by id */
router.get('/:id', function (req, res, next) {
  dbModule.getOrder(req.params.id, res);
});
/* POST create order*/
router.post('/create', function (req, res, next) {
  dbModule.createOrder(req.body, res);
});
/* POST delete order */
router.post('/delete', function (req, res, next) {
  dbModule.deleteOrder(req.body.id, res);
});
/* POST update order*/
router.post('/update', function (req, res, next) {
  dbModule.updateOrder(req.body._id, req.body, res);
});

module.exports = router;
