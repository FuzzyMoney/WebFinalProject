/* globals io */
import React from 'react';

class BasicChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      people: []
    };
  }

  sendName() {
    console.info('Name: ' +  $('#user').val());
    //this.socket.emit('send user', $('#user').val());
  }
  sendMessage() {
    console.info('Sending Message: ' +  $('#m').val());
    this.socket.emit('chat message', $('#user').val() + ': ' + $('#m').val());
  }

  componentWillMount() {
    this.socket = io();

    this.socket.on('send user', (name) => {
      let allNames = this.state.messages;
      allNames.push(name);
      this.setState({
        names: allNames
      });
    });

    this.socket.on('chat message', (msg) => {
      let newMessages = this.state.messages;
      newMessages.push(msg);
      this.setState({
        messages: newMessages
      });
    });
  }

  componentWillUmount() {
    this.socket.close();
  }

  render() {

    let messageItems = [];
    this.state.messages.forEach((message, i) => {
      messageItems.push(
      <li className="list-group-item" key={i}>{message}</li>
      );
    });
    return (
      <div>
        <ul className="list-group">{messageItems}</ul>
        <input id="m" type="text" className="form-control" placeholder="Type Message" />
        <button onClick={() => {this.sendMessage();}} className="btn btn-primary">Send</button>
          <input id="user" type="text" className="form-control" placeholder="Type Name" />
          <button onClick={() => {this.sendName();}} className="btn btn-primary">ChangeName</button>
      </div>
    );
  }
}

export default BasicChat;
