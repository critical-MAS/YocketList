import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const Nav = () => {
  return (
    <AppBar
      role="nav"
      className="Nav"
      title="YukeTube"
      titleStyle={{ fontFamily: 'Slabo' }}
      style={{ backgroundColor: '#b00' }}
    >
      <FlatButton
        className="nav-links"
        label={<Link to="profile">Home</Link>}
      />
    </AppBar>
  );
};

export default Nav;
