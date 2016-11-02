const HistoryController = require('./HistoryController')

const QueueController = {};
QueueController.storage = {};

QueueController.add = (roomID, songURL) => {
  console.log('Adding ', songURL, ' to event: ', roomID);
    if (QueueController.storage[roomID] !== undefined) {
      QueueController.storage[roomID].push(songURL);
    }
    else {
      QueueController.storage[roomID] = [];
      QueueController.storage[roomID].push(songURL);
    }
};

QueueController.remove = (roomID, songURL) => {
    if (QueueController.storage[roomID] === undefined) {
      throw new Error ('roomID not found.');
    }
    else if (QueueController.storage[roomID].includes(songURL)) {
      let song = songURL;
      QueueController.storage[roomID].splice(QueueController.storage[roomID].indexOf(songURL), 1);
      return song;
    }
    throw new Error ('songURL not found.');
};

QueueController.nextSong = (roomID) => {
    if (QueueController.storage[roomID] === undefined) {
      throw new Error ('roomID not found.');
    }
    else if (QueueController.storage[roomID][0]) {
      let lastSong = QueueController.storage.shift();
      HistoryController.add(roomID, lastSong);
      return lastSong;
    }
    throw new Error ('No next song in queue.');
};

module.exports = QueueController;
