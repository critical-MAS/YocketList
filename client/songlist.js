import React from 'react';
import Song from './song';

class SongList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
  let list;
  const google_id = this.props.google_id;
  const socket = this.props.socket;
   list = this.props.songs.map(function(songObj, ind) {
      return <Song key={ind} data={songObj} socket={socket} google_id={google_id}/>;
    });
  console.log(list);
  return (
    <div className="SongList">
      <h4>On Deck:</h4>
      {list}
    </div>
  )
}
}

export default SongList;
