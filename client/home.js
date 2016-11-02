import React from 'react';
import { Link } from 'react-router';
const testData = require('../server/model/database')

class Home extends React.Component {
  constructor(props) {
    super(props);
    const ourStuff = testData.queue["5817dafb1da5550f5405937f"];
    this.state = {
      event: testData.event,
      history: ourStuff,
      songs: ourStuff,
      guests: testData.guestList["5817dafb1da5550f5405937f"],
      google_id: document.cookie.replace(/(?:(?:^|.*;\s*)google_id\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
    };
    this.newState = this.newState.bind(this);
  }
  newState(newStateObj) {
        this.setState(newStateObj);
  }
    // this.powers.getData = function() {
    //     $.get(HOST + "/queue").done((data) => {
    //         this.setState({songs: data});
    //       });
    // };
  render() {
    return (
      <div>
        <h1>YukeToob</h1>
        <ul role="nav">
          <li><Link to="profile">Home</Link></li>
        </ul>
        {this.props.children && React.cloneElement(this.props.children, {
          state: this.state,
          newState: this.newState,
        })}
      </div>
    )
  }
}
export default Home;
