const User = require('../model/usermodel');
const fs = require('fs');
const path = require('path');


const GuestController = {};

GuestController.storage = JSON.parse(fs.readFileSync(path.join(__dirname, '../cache/GuestCache.json')));

GuestController.addToList = (req, res, next) => {
  let currentUserID = req.cookies.google_id;
    User.findOne({google_id: currentUserID}, (err, user) => {
      if (err) { throw new Error(err); }
        if (GuestController.storage[req.body.event_id]) {
          GuestController.storage[req.body.event_id].push(user);
        }
        else { GuestController.storage[req.body.event_id] = [user]; }
      fs.writeFileSync(path.join(__dirname, '../cache/GuestCache.json'), JSON.stringify(GuestController.storage, null, 2));
      req.body.newState.guests = GuestController.storage[req.body.event_id];
      console.log('req.body has events and guests', req.body.newState)
      next();
    });
};


module.exports = GuestController;
