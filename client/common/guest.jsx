import React from 'react';
// import ReactDOM from 'react-dom';

class Guest extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {  return <div className='GuestBox-GuestName'>
    {this.props.name}
    </div>;
}
}
export default Guest;
