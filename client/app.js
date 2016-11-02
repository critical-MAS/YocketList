import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
// import Layout from './layout';
import Profile from './profile';
import HostApp from './hostapp';
import GuestApp from './guestapp';
import CreateEvent from './createevent';
import Home from './home';
const HOST = require('../app.config').HOST;

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Home} >
          {/* make them childen of `App` */}
          <Route path="profile" component={Profile} newState={this.newState}/>
          <Route path="host/:eventId" component={HostApp} state={this.state} newState={this.newState}/>
          <Route path="guest/:eventId" component={GuestApp} state={this.state} newState={this.newState}/>
          <Route path="createevent" component={CreateEvent} state={this.state} newState={this.newState} />
        </Route>
      </Router>)
    }
    getData() {
      $.get(HOST + "/queue").done((data) => {
        this.setState({songs: data});
      });
    }

}
export default App;
