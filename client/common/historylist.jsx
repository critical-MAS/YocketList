import React from 'react';
import HistoryItem from './historyitem';

class HistoryList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
  let list;
   list = this.props.history.map(function(historyObj, ind) {
      return <HistoryItem key={ind} data={historyObj} />;
    });
  return (
    <div className="HistoryList">
      <h4>History:</h4>
      {list}
    </div>
  )
}
}

export default HistoryList;
