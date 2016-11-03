const express = require('express')
const app = express();
// const jsonParser = bodyParser.json();
const path = require('path');
const mongoose = require('mongoose');
const User = require('./model/usermodel');
const Event = require('./model/eventmodel');
const Testdata = require('./model/database');
const http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');
const bodyparser = require('body-parser');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport');
const UserController = require('./controllers/UserController');
const AuthenticationController = require('./controllers/AuthenticationController');
const GuestController = require('./controllers/GuestController');
const EventController = require('./controllers/EventController');
const HistoryController = require('./controllers/HistoryController');
const QueueController = require('./controllers/QueueController')
const creds = require('../app.config');
const session = require('express-session');
const cookieParser = require('cookie-parser')
mongoose.connect('mongodb://localhost/yockette', () => {
	console.log("mongoose connected");
});
// const oauth = require('./google-passport');

app.use( express.static(path.join(__dirname, 'dist')));
app.use( session({ path: '*', secret: 'YukeBox', httpOnly: true, secure: false, maxAge: null }));
app.use( cookieParser() );
app.use(bodyparser.json());
// CORS headers
app.use((req,res,next) =>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	next();
});

passport.use(new GoogleStrategy({
    clientID:     creds.GOOGLE_CLIENT_ID,
    clientSecret: creds.GOOGLE_CLIENT_SECRET,
    callbackURL: creds.CALLBACK_URL,
    passReqToCallback   : true
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
			const query = {google_id: profile.id};
			const update = {google_id: profile.id, username: profile.name.givenName};
			const options = {new: true, upsert: true};
			console.log('hi');
      User.findOneAndUpdate(query, update, options).then(user => {
				console.log('Got it!');
				done(null, user);
			}).catch (err => {
				console.log('Error in adding User: ', err);
				done(err);
			});
			// if (err) {
      //     console.log(err);
      //     done();
      //   }
      //   if (!user) {
      //     user = new User({
      //       google_id: profile.id,
      //       username: profile.name.givenName,
      //       favlist: []
      //   })
      //     user.save();
      //   }
      //   if (user) {
      //     return done(null, user);
      //   }
      });
  }
));

app.use( passport.initialize());
app.use( passport.session());

passport.serializeUser(function(user, done) {
  console.log('Serializing');
  done(null, {
    google_id: user.google_id,
    username: user.username
  });
});

passport.deserializeUser(function(user, done) {
  console.log('Deserializing');
  User.findOne({google_id: user.google_id}, function(err, user) {
    done(err, user);
  });
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', (
    	passport.authenticate( 'google', {
    		successRedirect: '/',
    		failureRedirect: '/login'
})));

// Future Login and Logout Logic

app.get('/', AuthenticationController.isAuthenticated, (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
})

app.get('/bundle.js', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '../dist/bundle.js'));
})

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

/* Database */
const qArray = [];

/* Express Middleware */


//keep this method --soo


// Easter egg for API server <3 YOCKET LIST
app.get('/login', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../dist/login.html'));
});

// getting queue to render on event(room) page
app.get('/queue', (req, res) => {
  res.status(200).send(Testdata.queue)
})

//getting guestlist to render on event(room) page
app.get('/guestlist', (req, res) => {
  res.status(200).send(Testdata.guestlist)
})

//adding new data to queue, adds to the end of the list

app.post('/queue/:id', (req, res) => {
  QueueController.add(req.params.id, req.cookies.username, req.body.link);
	console.log('Emitting newdata to: ', req.params.id);
  io.emit(`newdata:${req.params.id}`, {songs: QueueController.storage[req.params.id], history: HistoryController.storage[req.params.id], guests: GuestController.storage[req.params.id]});
});

// app.post('/queue', (req, res) => {
//   // Testdata.queue.push(req.body);
//   io.emit('newdata', {songs: req.body, history: HistoryController.list, guests: GuestController.list});
// });

app.post('/addqueue', (req, res) => {
  Testdata.queue.push(req.body);
  io.emit('newQueue', Testdata.queue);
  res.status(200).send("");
  res.end();
})

app.post('/create-event', EventController.addToList, GuestController.addToList, (req, res) => {
  res.json(req.body.newState);
})

app.post('/joinevent', EventController.joinEvent, GuestController.addToList, (req, res) => {
  res.json(req.body.newState);
});

// app.post('/queue', (req, res) => {
//   if(req.body.method){
//     if(req.body.method === 'delete'){
//       console.log(`/queue :: [DELETE] removing first item from ${qArray}`);
//       qArray.shift();
//       console.log(`/queue :: [DELETE] result of delete ${qArray}`);
//       io.emit('newdata', qArray.length);
//       res.status(200).send("");
//       return;
//     }
//   }
//   if(!req.body.link){
//     res.status(400).send("no data supplied");
//     return;
//   }
//   qArray.push(req.body.link);
//   console.log(`/queue :: [POST] results in ${qArray}`);
//   io.emit('newdata', qArray.length);
//   res.status(200).send("git it");
//   res.end();
// });

/* Socket and Server Setup */
io.on('connect', (socket) => {
  socket.on('nextSong', (roomID) => {
    console.log('got next song event from roomID: ', roomID)
    QueueController.nextSong(roomID);
    console.log('Emitting newData \'cuz songs on:', roomID);
    socket.emit(`newdata:${roomID}`, {songs: QueueController.storage[roomID]});
  }
    );
  console.log(`User connected ${socket.id}`);
});

http.listen(3000, () => {
  console.log("Server started on port 3000");
});

/** Socket Event Spec
 * This is a list of socket events and their triggers
 * Emit ['newdata']: notifies subscribers to query for new data
 *  - when any user saves an item to the database
 *  - when a player window deletes an item from the database
 */

module.exports = app;
