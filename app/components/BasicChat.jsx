/* globals io */
import React from 'react';

class BasicChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  sendMessage() {
    console.info('Sending Message: ' +  $('#m').val());
    this.socket.emit('chat message', $('#m').val());
  }

  componentWillMount() {
    this.socket = io();

    this.socket.on('chat message', (msg) => {
      let newMessages = this.state.messages;
      newMessages.push(msg);
      this.setState({
        messages: newMessages
      });
    });

    this.socket.on('history')
  }

  componentWillUmount() {
    this.socket.close();
  }

  render() {

    let messageItems = [];
    this.state.messages.forEach((message, i) => {
      messageItems.push(
      <li key={i}>{message}</li>
      );
    });
    return (
      <div>
        <ul>{messageItems}</ul>
        <input id="m" type="text" className="form-control" placeholder="Type Message" />
        <button onClick={() => {this.sendMessage();}} className="btn btn-primary">Send</button>
      </div>
    );
  }
}

export default BasicChat;
