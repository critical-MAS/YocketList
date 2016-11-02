import React from 'react';
// import ReactDOM from 'react-dom';
// import Player from './player';
import Youtube from 'react-youtube';
import io from 'socket.io-client';
import SongList from './songlist';
import HistoryList from './historylist';
import GuestBox from'./guestbox';
import Form from './queueform';

const HOST = require('../app.config').HOST;

class HostApp extends React.Component {
  constructor() {
    super();
    this.handlePlayerEnd = this.handlePlayerEnd.bind(this);
    this.formClick = this.formClick.bind(this);
  }
  componentDidMount() {
    //initiate socket connection and set up listeners
    this.socket = io.connect(HOST);
    this.socket.on('connect', () => {
      console.log('Host Socket Id: ', this.socket.id);
      this.initSocket();
    });
  }
  /**
   * This is where the listers for this.socket go.
   * on[newData] -> implies there is a change in data on the backend
   *                the callback will make a GET request and update state
   *                with the new list of Youtube URLs
   */
   formClick(link) {
       console.log('Posting NEW LINK : ', link);
       $.ajax({
         url: HOST+"/queue/"+ this.props.params.eventId,
         type:"POST",
         data: JSON.stringify({link: link}),
         contentType:"application/json; charset=utf-8",
         dataType:"json",
       });

   };
  initSocket () {
    console.log('Current route State:', this.props.state);
    console.log('Attaching event listener: ', `newdata:${this.props.state._id}`);
    this.socket.on(`newdata:${this.props.state._id}`, (newStateObj) => {
      console.log("got new newStateObj!", newStateObj);
      this.props.newState(newStateObj);
    });
  }
  /**
   * We GET our initial set of data here after the first render
   * has been made.
   */
  /**
   * handleStateChange is an event listener for the react-youtube
   * componenet's state. The states are as follows:
   * UNSTARTED: -1, ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5
   */
  handleStateChange(event){
    console.log(event.data);
    // CUED was a good option for enabling "auto play" because it waits
    // until the player is loaded (-1) and then the video is cued ready to play
    if(event.data === 5){
      event.target.playVideo();
    }
  }
/**
 * This method makes a post request to the server with the body {method: 'delete'}
 * This removes an item from the db and notifies all clients with the newdata event.
 */
  handlePlayerEnd(event){
    this.socket.emit('newSong', this.props.state.event._id);
    // $.ajax({
    //   type: "POST",
    //   url: HOST + "/queue",
    //   data: JSON.stringify({method: "delete"}),
    //   contentType: "application/json; charset=utf-8",
    //   });
  }

  render() {
    return (
      <div>
        <h1>Hosting Event: {this.props.state.event.eventName}</h1>
        <Youtube videoId={this.props.state.songs[0].url} onEnd={this.handlePlayerEnd} onStateChange={this.handleStateChange}/>
        <GuestBox guests={this.props.state.guests}/>
        <div className="SongList-Form-container">
          <SongList songs={this.props.state.songs} socket={this.socket} google_id={this.props.state.google_id}/>
          <Form key={0} formClick={this.formClick} />
        </div>
        <HistoryList history={this.props.state.history} socket={this.socket}/>
      </div>
    )
  }
  }

export default HostApp;
