import React from 'react';
const HOST = require('../app.config').HOST;

class CreateEvent extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
handleClick(e) {
  // e.preventDefault();
  const form = document.forms.newParty;
  const google_id = document.cookie.replace(/(?:(?:^|.*;\s*)google_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  console.log('cookies!', google_id);
  const newEventObj = {
    google_id: google_id,
    eventName: form.eventName.value,
    eventType: 'Pool Party',
    eventPassword: form.eventPass.value,
  };
  console.log('Posting New Event:', newEventObj);
  newEventObj.matchmaking = form.matchMakingEnabled.value === 'on' ? true : false;
  // this.props.powers.createEvent(newEventObj);
  const newState = this.props.newState;
  $.ajax({
        url: HOST+"/create-event",
        type:"POST",
        data: JSON.stringify(newEventObj),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
      }).always(function(response) {
        console.log('Got a response with createRoom data: ', response);
        if (response['errmsg']) {
          alert('That name already exists!');
        } else {
          newState(response);
          window.location = `/account#/host/${response._id}`;
    }});
}

render() {
  return (
    <div>
      <h1>Having a Party, eh?</h1>
      <form name="newParty">
        Event Name: <input type='text' name='eventName' placeholder='Orangutan Jam'></input>
        Event Password: <input type='text' name='eventPass' placeholder='CrazyApes'></input>
        Fave Matchmaking Enabled: <input type='checkbox' name='matchMakingEnabled'></input>
      </form>
      <button onClick={this.handleClick.bind(this)}>Create</button>
      </div>
      )
  }
}
export default CreateEvent;
