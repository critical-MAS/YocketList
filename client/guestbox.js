import React from 'react';
import Guest from './guest';

class GuestBox extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
  let list;
   list = this.props.guests.map(function(guestObj, ind) {
      return <Guest key={ind} name={guestObj.username} />;
  });
  return <div className="GuestBox">
    <h4>Guests</h4>
    {list}
    </div>;
}
}
export default GuestBox;
