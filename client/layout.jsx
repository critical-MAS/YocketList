import React from 'react';
// import ReactDOM from 'react-dom';
import { Link } from 'react-router';

/**
 * Layout is the react-router component that defines the structure of the page.
 * this.props.children changes based on the current route.
 */
class Layout extends React.Component {
 render() {
    return (
      <div>
        <h1>YukeToob</h1>
        <ul role="nav">
          <li><Link to="home">Home</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default Layout;
