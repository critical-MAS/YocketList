import React from 'react';
// import ReactDOM from 'react-dom';

class Song extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  upVote() {
    const upVoteObj = {
      google_id: this.props.google_id,
      url: this.props.data.url,
    };
    console.log('emitting upvote with: ', upVoteObj);
    this.props.socket.emit('upVote', upVoteObj);
  }
  downVote() {
    const downVoteObj = {
      google_id: this.props.google_id,
      url: this.props.data.url,
    };
    console.log('emitting downVote with: ', downVoteObj);
    this.props.socket.emit('downVote', downVoteObj);
  }
  fave() {
    const faveObj = {
      google_id: this.props.google_id,
      url: this.props.data.url,
    };
    console.log('emitting fave with: ', faveObj);
    this.props.socket.emit('fave', faveObj);
  }
  render() {
    this.props.data.downVote = () => {console.log('clicked downvote!');};
    this.props.data.Fave = () => {console.log('clicked Fave!');};
    return (
      <div>
        {this.props.data.title}, added by: {this.props.data.added_by}
        <img src={`https://i.ytimg.com/vi/${this.props.data.url.split('=')[1]}/hqdefault.jpg`}></img>
        <div className="Action-upVote" onClick={() => this.props.data.upVote(this.props.data.url)} />
        <div className="Action-downVote" onClick={() => this.props.data.downVote(this.props.data.url)} />
        <div className="Action-Fave" onClick={() => this.props.data.Fave(this.props.data.url)} />
      </div>
    )
}
}
export default Song;
