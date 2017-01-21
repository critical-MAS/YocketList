import React from 'react';
// import ReactDOM from 'react-dom';

class HistoryItem extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
    <div className="HistoryItem">
      <span className="HistoryItem-AddedBy">added by: {this.props.data.added_by}</span>
      <div className="Action-Fave" onClick={() => this.props.data.fave(this.props.data.url)} />
      <img src={`https://i.ytimg.com/vi/${this.props.data.url.split('=')[1]}/hqdefault.jpg`}></img>
    </div>
  )
}
}

export default HistoryItem;
