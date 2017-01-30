import React from 'react';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
// import ReactDOM from 'react-dom';
const HOST = require('./../../app.config').HOST;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    this.google_id = document.cookie.replace(/(?:(?:^|.*;\s*)google_id\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  }
  updateUser() {
    console.log('hi! let\'s update your name, eh?');
    const form = document.forms.displayNameUpdate;
    const userUpdateObj = {
      username: form.username.value,
      google_id: this.google_id,
    };
    console.log('Sending userUpdateObj: ', userUpdateObj);
    $.ajax({
      url: HOST + '/updateUser',
      type: 'POST',
      data: JSON.stringify(userUpdateObj),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    }).always((response) => {
      console.log('Got a response with new user data: ', response);
      if (response.errmsg) {
        alert('Something Went Wrong with your Name Update!');
      }
    });
  }
  joinRoom() {
    const form = document.forms.joinRoom;
    const google_id = document.cookie.replace(/(?:(?:^|.*;\s*)google_id\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    if (form.eventName.value && form.eventPassword.value) {
      const newEventObj = {
        google_id,
        eventName: form.eventName.value,
        eventPassword: form.eventPassword.value,
      };
      console.log('Attempting to Join Event:', newEventObj);
      // this.props.powers.createEvent(newEventObj);
      const newState = this.props.newState;
      $.ajax({
        url: HOST + '/joinevent',
        type: 'POST',
        data: JSON.stringify(newEventObj),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
      }).always((response) => {
        console.log('Got a response with event data: ', response);
        if (response.errmsg) {
          alert('Room not Found!');
        } else {
          newState(response);
          window.location = `/#/guest/${response.event._id}`;
        }
      });
    } else alert('Please enter a username and password to join an event.');
  }

  render() {
    return (
      <div className="Profile-Container">
        <form name="displayNameUpdate">
          <TextField
            defaultValue={this.username}
            name="username"
            type="text"
            floatingLabelText="Howdy, what is your name?"
            inputStyle={{
              color: 'white',
              fontFamily: 'Slabo',
            }}
            hintStyle={{
              color: 'white',
              fontFamily: 'Slabo',
            }}
            floatingLabelStyle={{
              color: 'white',
              fontFamily: 'Slabo',
            }}
            underlineStyle={{ borderColor: 'white' }}
            underlineFocusStyle={{ borderColor: 'red' }}
          />
        </form>
        <FlatButton
          onClick={this.updateUser.bind(this)}
          type="submit"
          label="Update Name"
          hoverColor="red"
          style={{
            color: 'white',
            fontFamily: 'Slabo',
          }}
        />
        <form name="joinRoom">
          <ul>
            <li><TextField
              name="eventName"
              type="text"
              floatingLabelText="Event Name"
              inputStyle={{
                color: 'white',
                fontFamily: 'Slabo',
              }}
              hintStyle={{
                color: 'white',
                fontFamily: 'Slabo',
              }}
              floatingLabelStyle={{
                color: 'white',
                fontFamily: 'Slabo',
              }}
              underlineStyle={{ borderColor: 'white' }}
              underlineFocusStyle={{ borderColor: 'red' }}
            /></li>
            <li><TextField
              name="eventPassword"
              type="password"
              floatingLabelText="Event Password"
              inputStyle={{
                color: 'white',
                fontFamily: 'Slabo',
              }}
              hintStyle={{
                color: 'white',
                fontFamily: 'Slabo',
              }}
              floatingLabelStyle={{
                color: 'white',
                fontFamily: 'Slabo',
              }}
              underlineStyle={{ borderColor: 'white' }}
              underlineFocusStyle={{ borderColor: 'red' }}
            /></li>
          </ul>
        </form>
        <span>
          <FlatButton
            onClick={this.joinRoom.bind(this)}
            type="submit"
            label="Join Event"
            hoverColor="red"
            style={{
              color: 'white',
              fontFamily: 'Slabo',
            }}
          />
          <FlatButton
            label={<Link to="createEvent">Create New Event</Link>}
            hoverColor="red"
            style={{
              color: 'white',
              fontFamily: 'Slabo',
            }}
          />
        </span>
      </div>
    );
  }
}

export default Profile;
