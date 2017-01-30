import React from 'react';
// import ReactDOM from 'react-dom';
// import Song from './song';
import Form from '../../common/queueform';
import SongList from '../../common/songlist';
import HistoryList from '../../common/historylist';
import GuestBox from './../../common/guestbox';
import io from 'socket.io-client';

const HOST = "http://localhost:3000";

class GuestApp extends React.Component {
  constructor(props) {
    super(props);
}
  /**
   * We GET our initial set of data here after the first render
   * has been made.
   */
  componentDidMount() {
    this.socket = io.connect(HOST);
    this.socket.on('connect', () => {
      console.log('Guest Socket Id: ', this.socket.id);
      this.initSocket();
    });

  }
    // Initialize Listener
  //   this.socket.on('event', () => {
  //     this.props.getData();
  //   });
  //   // redundant? Maybe just issue a newdata event on connect?
  //   this.props.getData();
  // }

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
      console.log('Attaching event listener: ', `newdata:${this.props.state.event._id}`);
    this.socket.on(`newdata:${this.props.state.event._id}`, (newStateObj) => {
      console.log("got new newStateObj!", newStateObj);
      this.props.newState(newStateObj);
    });
  }
  /**
   * This is the callback for the form component to use in onClick.
   * It makes an ajax request to add a new link when the submit button is clicked.
   */

  render() {
    return (
      <div>
        <h1>Event: {this.props.state.event.eventName}</h1>
        <GuestBox guests={this.props.state.guests}/>
        <div className="SongList-Form-container">
          <SongList songs={this.props.state.songs} socket={this.socket} google_id={this.props.state.google_id}/>
          <Form key={0} formClick={this.formClick.bind(this)} />
        </div>
        <HistoryList history={this.props.state.history} />
      </div>
    )
  }
}

export default GuestApp;
