const UserController = {};
const User = require('../model/usermodel');

UserController.updateUser = (req, res, next) => {
  User.update({ google_id: req.body.google_id }, {
    username: req.body.username,
  }, (err, numModified) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.cookie('username', req.body.username);
      console.log('Modifed Records', numModified);
      res.json(numModified);
    }
  });
};

module.exports = UserController;
