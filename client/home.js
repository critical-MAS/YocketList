import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      history: [],
      songs: [],
      guests: [],
      google_id: document.cookie.replace(/(?:(?:^|.*;\s*)google_id\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
    };
    this.newState = this.newState.bind(this);
  }
  newState(newStateObj) {
        this.setState(newStateObj);
  }

  render() {
    return (
      <div>
        <h1>YukeTube</h1>
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
