var express = require('express');
var router = express.Router();
var dbModule = require('../dbmodule.js');
/* GET select all users */
router.get('/', function (req, res, next) {
  dbModule.listUsers(res);
});
/* GET select by username */
router.get('/:username', function (req, res, next) {
  dbModule.getUser(req.params.username, res);
});
/* GET select by username */
router.get('/getUserByEmail/:email', function (req, res, next) {
  dbModule.getUserByEmail(req.params.email, res);
});
/* POST select by username and password */
router.post('/user-details', function (req, res, next) {
  dbModule.userDetails(req.body, res);
});
/* POST create new user*/
router.post('/create', function (req, res, next) {
  dbModule.addUser(req.body, res);
});
/* POST update user details*/
router.post('/update', function (req, res, next) {
  dbModule.updateUser(req.body.username, req.body, res);
});
/* POST create guest user*/
router.post('/guest', function (req, res, next) {
  dbModule.addGuest(req.body, res);
});

module.exports = router;
