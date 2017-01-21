import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
const HOST = require('../app.config').HOST;

class CreateEvent extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  handleClick(e) {
  // e.preventDefault();
    const form = document.forms.newParty;
    const google_id = document.cookie.replace(/(?:(?:^|.*;\s*)google_id\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    console.log('cookies!', google_id);
    const newEventObj = {
      google_id,
      eventName: form.eventName.value,
      eventType: 'Pool Party',
      eventPassword: form.eventPass.value,
    };
    console.log('Posting New Event:', newEventObj);
    newEventObj.matchmaking = form.matchmakingStatus.value;
  // this.props.powers.createEvent(newEventObj);
    const newState = this.props.newState;
    $.ajax({
      url: HOST + '/create-event',
      type: 'POST',
      data: JSON.stringify(newEventObj),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    }).always((response) => {
      console.log('Got a response with createRoom data: ', response);
      if (response.errmsg) {
        alert('That name already exists!');
      } else {
        newState(response);
        window.location = `/#/host/${response.event._id}`;
      }
    });
  }

  render() {
    let favoriteBtn;

    return (
      <div>
        <form name="newParty">
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
              name="eventPass"
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
            <li>
              <FlatButton
                name="matchmakingStatus"
                label="Favorites Matchmaking"
                icon={<ActionFavorite style={{ fill: 'white' }}/>}
                hoverColor="red"
                onClick={() => this.value = !this.value}
                labelStyle={{
                  color: 'white',
                  fontFamily: 'Slabo',
                }}
                value={false}
              />
            </li>
          </ul>
        </form>
        <FlatButton
          onClick={this.handleClick.bind(this)}
          type="submit"
          label="Create Event"
          hoverColor="red"
          style={{
            color: 'white',
            fontFamily: 'Slabo',
          }}
        />
      </div>
    );
  }
}
export default CreateEvent;
