import React from 'react';
import { Link } from 'react-router';
// import ReactDOM from 'react-dom';
const HOST = require('../app.config').HOST;

class Profile extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  updateUser() {
    console.log('hi!');
  }
  joinRoom() {
    const form = document.forms.joinRoom;
    const google_id = document.cookie.replace(/(?:(?:^|.*;\s*)google_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    const newEventObj = {
      google_id,
      eventName: form.eventName.value,
      eventPassword: form.eventPassword.value,
    };
    console.log('Attempting to Join Event:', newEventObj);
    // this.props.powers.createEvent(newEventObj);
    const newState = this.props.newState;
    $.ajax({
          url: HOST+"/joinevent",
          type:"POST",
          data: JSON.stringify(newEventObj),
          contentType:"application/json; charset=utf-8",
          dataType:"json",
        }).always(function(response) {
          console.log('Got a response with event data: ', response);
          if (response['errmsg']) {
            alert('Room not Found!');
          } else {
            newState(response);
            window.location = `/#/guest/${response.event._id}`;
      }});
  }

  render() {
  return (
    <div className='Profile-Container'>
    <h1>Howdy There</h1>
    <form name="displayNameUpdate">
      <input type='text' name='username' placeholder={document.cookie['displayname']}></input>
    </form>
    <button onClick={this.updateUser}>Update Name</button>
    <form name="joinRoom">
      <input type='text' name='eventName' placeholder="Event Name"></input>
      <input type='text' name='eventPassword' placeholder = "Event Password"></input>
    </form>
    <button onClick={this.joinRoom.bind(this)}>Join Room</button>
  <Link to="createEvent">Create New Event</Link>
  </div>
)
}
}

export default Profile;
