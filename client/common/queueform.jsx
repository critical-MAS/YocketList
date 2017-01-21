import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class QueueForm extends React.Component {
  render() {
    return (
      <div className="Form-Container">
        <form name="addLink">
          <TextField
            name="link"
            type="text"
            floatingLabelText="Enter YouTube Video URL"
            inputStyle={{
              color: 'white',
              fontFamily: 'Slabo',
            }}
            hintStyle={{
              color: 'white',
              fontFamily: 'Slabo',
            }}
            floatingLabelStyle={{
              color: 'white',
              fontFamily: 'Slabo',
            }}
            underlineStyle={{ borderColor: 'white' }}
            underlineFocusStyle={{ borderColor: 'red' }}
          />
          <FlatButton
            type="submit"
            name="YouTubeURL"
            label="Add to Queue"
            hoverColor="red"
            onClick={this.handleClick.bind(this)}
            onKeyPress={this._handleChange}
            labelStyle={{
              color: 'white',
              fontFamily: 'Slabo',
            }}
            value="Submit"
          />
        </form>
      </div>
    );
  }

  /**
   * event handler the form submission. This will use the formClick callback
   * to make the ajax request and clear the form.
   * preventDefault is used to prevent a page refresh.
   */
  handleClick(e) {
    e.preventDefault();
    const form = document.forms.addLink;
    const link = form.link.value;
    this.props.formClick(link);
    form.link.value = '';
  }

  /**
   * event handler for form sumission. It intercepts key presses to enter to allow
   * the user to submit using the enter button.
   */
  handlenter(e) {
    if (e.key === 'Enter') {
      handleClick(e);
    }
  }
}

export default QueueForm;
