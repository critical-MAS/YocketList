const fs = require('fs');
const path = require('path');

const HistoryController = {};
HistoryController.storage = JSON.parse(fs.readFileSync(path.join(__dirname, '../cache/HistoryCache.json')));

HistoryController.add = (roomID, songObj) => {
    if (HistoryController.storage[roomID] !== undefined) {
      HistoryController.storage[roomID].unshift(songObj);
      fs.writeFileSync(path.join(__dirname, '../cache/HistoryCache.json'), JSON.stringify(HistoryController.storage, null, 2));
    }
    else {
      HistoryController.storage[roomID] = [];
      HistoryController.storage[roomID].unshift(songObj);
      fs.writeFileSync(path.join(__dirname, '../cache/HistoryCache.json'), JSON.stringify(HistoryController.storage, null, 2));
    }
};

// HistoryController.remove = (roomID, songURL) => {
//     if (HistoryController.storage[roomID] === undefined) {
//       throw new Error ('roomID not found.');
//     }
//     else if (HistoryController.storage[roomID].includes(songURL)) {
//       let song = songURL;
//       HistoryController.storage[roomID].splice(HistoryController.storage[roomID].indexOf(songURL), 1);
//       fs.writeFileSync(path.join(__dirname, '../cache/EventCache.json'), JSON.stringify(HistoryController.storage, null, 2));
//       return song;
//     }
//     throw new Error ('songURL not found.');
// };

module.exports = HistoryController;
