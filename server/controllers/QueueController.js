const fs = require('fs');
const path = require('path');

const HistoryController = require('./HistoryController')

const QueueController = {};
QueueController.storage = JSON.parse(fs.readFileSync(path.join(__dirname, '../cache/QueueCache.json')));

QueueController.add = (roomID, username, songURL) => {
  console.log('Adding ', songURL, ' to event: ', roomID);
    if (QueueController.storage[roomID] !== undefined) {
      QueueController.storage[roomID].push({addedBy: username, url: songURL});
      fs.writeFileSync(path.join(__dirname, '../cache/EventCache.json'), JSON.stringify(QueueController.storage, null, 2));
    }
    else {
      QueueController.storage[roomID] = [];
      QueueController.storage[roomID].push({addedBy: username, url: songURL});
    }
};

// QueueController.remove = (roomID, songURL) => {
//     if (QueueController.storage[roomID] === undefined) {
//       throw new Error ('roomID not found.');
//     }
//     else if (QueueController.storage[roomID].includes(songURL)) {
//       let song = songURL;
//       QueueController.storage[roomID].splice(QueueController.storage[roomID].indexOf(songURL), 1);
//       fs.writeFileSync(path.join(__dirname, '../cache/EventCache.json'), JSON.stringify(QueueController.storage, null, 2));
//       return song;
//     }
//     throw new Error ('songURL not found.');
// };

QueueController.nextSong = (roomID) => {
    if (QueueController.storage[roomID] === undefined) {
      throw new Error ('roomID not found.');
    }
    else if (QueueController.storage[roomID][0]) {
      let lastSongObj = QueueController.storage[roomID].shift();
      HistoryController.add(roomID, lastSongObj);
      fs.writeFileSync(path.join(__dirname, '../cache/EventCache.json'), JSON.stringify(QueueController.storage, null, 2));
      return lastSongObj;
    }
    throw new Error ('No next song in queue.');
};

module.exports = QueueController;
