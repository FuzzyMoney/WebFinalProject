/* globals io */
import React from 'react';

class BasicChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  sendName() {
    console.info('Name: ' +  $('#user').val());
    this.socket.emit('send user', $('#user').val());
    $('#user').val('');
  }

  sendMessage() {
    console.info('Sending Message: ' +  $('#m').val());
    this.socket.emit('chat message', $('#m').val());
    $('#m').val('');
  }

  componentWillMount() {
    this.socket = io();

    this.socket.on('bad name', (name) => {
      window.alert(`"${name}" is already in use`);
    });

    this.socket.on('chat message', (msg) => {
      let newMessages = this.state.messages;
      newMessages.push(msg);
      this.setState({
        messages: newMessages
      });
    });
  }

  componentDidMount() {
    //TODO Set enter key
    $('#m').keyup((event) => {
      if(event.keyCode == 13) { $('#messageSend').click(); }
    });

    $('#user').keyup((event) => {
      if(event.keyCode == 13) { $('#nameSend').click(); }
    });
  }

  componentDidUpdate() {
    //TODO Set Scroll
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
        <button id="messageSend" onClick={() => {this.sendMessage();}} className="btn btn-primary">Send</button>

        <input id="user" type="text" className="form-control" placeholder="Type Name" />
        <button id="nameSend" onClick={() => {this.sendName();}} className="btn btn-primary">ChangeName</button>
      </div>
    );
  }
}

export default BasicChat;
