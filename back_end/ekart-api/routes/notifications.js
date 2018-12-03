var express = require('express');
var router = express.Router();
var dbModule = require('../dbmodule.js');
/* GET select all notifications of user */
router.get('/:username', function (req, res, next) {
  dbModule.getNotifications(req.params.username, res);
});
/* POST create notification*/
router.post('/create', function (req, res, next) {
  dbModule.addNotification(req.body, res);
});
/* POST update notification */
router.post('/update', function (req, res, next) {
  dbModule.updateNotification(req.body.notificationID, req.body, res);
});

module.exports = router;
