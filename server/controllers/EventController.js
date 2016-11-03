const Event = require('../model/eventmodel');

const HistoryController = require('./HistoryController');
const GuestController = require('./GuestController');
const QueueController = require('./QueueController');

const EventController = {};

EventController.addToList = (req, res, next) => {
  console.log('user cookie: ', req.cookies.username);
  Event.create(req.body)
  .then(event => {
    console.log('Created New Event: ', event);
    HistoryController.storage[event._id] = [];
    QueueController.storage[event._id] = [];
    GuestController.storage[event._id] = [];
    req.body.event_id = event._id;
    req.body.newState = {event};
    console.log('setting event_id on req.body. eventObj: ', event);
    next();
  })
  .catch(err => {
    console.log('Error creating Event: ', err);
    res.json(err);
  })
}

EventController.joinEvent = (req, res, next) => {
  Event.findOne({eventName: req.body.eventName})
  .where('eventPassword').equals(req.body.eventPassword)
  .then(event => {
    console.log('setting event_id on req.body. eventObj: ', event);
    req.body["event_id"] = event._id;
    const responseObj = {
      event: event,
      history: HistoryController.storage[event._id],
      songs: QueueController.storage[event._id],
      guests: GuestController.storage[event._id]
    };
    console.log('response:', responseObj);
    // res.send(JSON.stringify(responseObj));
    req.body.newState = responseObj;
    next();
  })
  .catch(err => {
    res.send(JSON.stringify(err));
    next();
  });
}


module.exports = EventController;
