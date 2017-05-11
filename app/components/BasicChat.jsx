/* globals io */
import React from 'react';

class BasicChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      names: [],
      isTyping: []
    };
  }

  sendName() {
    //console.info('Name: ' +  $('#user').val());
    if($('#user').val() != '')
    {
      this.socket.emit('send user', $('#user').val());
    }
    $('#user').val('');
  }

  sendMessage() {
    //console.info('Sending Message: ' +  $('#m').val());
    if($('#m').val() != '')
    {
      this.socket.emit('chat message', $('#m').val());
    }
    $('#m').val('');
  }

  sendTyping() {
    this.socket.emit('tying message', $('#user').val() + 'is typing...');
  }

  componentWillMount() {
    this.socket = io();

    this.socket.on('bad name', (name) => {
      window.alert(`"${name}" is already in use`);
    });

    this.socket.on('name list', (newNames) => {
      this.setState({
        names: newNames,
        isTyping: new Array(newNames.size).fill(0)
      });
    });

    this.socket.on('chat message', (msg) => {
      let newMessages = this.state.messages;
      newMessages.push(msg);
      this.setState({
        messages: newMessages
      });
    });

    this.socket.on('typing',  (name) => {
      // Show they are typing
      var which = this.state.names.indexOf(name);
      var isTyping = this.state.typing;
      isTyping[which]++;
      this.setState({
        typing: isTyping
      });

      // Stop showing later
      setTimeout(() => {
        var isTyping = this.state.typing;
        isTyping[which]--;
        isTyping[which] = Math.max(0, isTyping[which]);
        this.setState({
          typing: isTyping
        });
      }, 500);
    });
  }

  componentDidMount() {
    $('#m').keyup((event) => {
      if(event.keyCode == 13) { $('#messageSend').click(); }
    });

    $('#user').keyup((event) => {
      if(event.keyCode == 13) { $('#nameSend').click(); }
    });

    //if keydown then display isTyping..., don't if keyup
    $('#m').on('change paste keyup', () => {
      this.socket.emit('typing', 'isTyping...');
    });
  }


  componentDidUpdate() {
    $('#tableDiv')[0].scrollTop =
      $('#tableDiv')[0].scrollHeight;
  }

  componentWillUmount() {
    this.socket.close();
  }

  render() {

    let messageItems = [];
    this.state.messages.forEach((message, i) => {
      messageItems.push(
        <tr key={i}><td>{message}</td></tr>
      );
    });
    let nameItems = [];
    this.state.names.forEach((name, i) => {
      nameItems.push(
        <tr key={i}><td>{name}</td></tr>
      );
    });
    let mDiv = {
      'border': '1px solid #EEEEEE',
      'borderRadius': '5px',
      'height': '400px',
      'display': 'block',
      'overflow': 'auto'
    };

    return (
      <div>
        <div className="row">
          <div id="tableDiv" style={mDiv} className="col-xs-8">
            <table className="table table-striped table-bordered">
              <tbody>
                {messageItems}
              </tbody>
            </table>
          </div>

          <div id="tableDiv" style={mDiv} className="col-xs-4">
            <table className="table table-striped table-bordered">
              <tbody>
                {nameItems}
              </tbody>
            </table>
          </div>
        </div>

        <hr />

        <div className="form-inline form-group">
          <input id="m" type="text" className="form-control" placeholder="Type Message" style={{width: '80%'}}/>
          <button id="messageSend" onClick={() => {this.sendMessage();}} className="btn btn-primary pull-right" style={{width: '17%'}}>Send</button>
        </div>

        <div className="form-inline form-group">
          <input id="user" type="text" className="form-control" placeholder="Type Name" style={{width: '80%'}}/>
          <button id="nameSend" onClick={() => {this.sendName();}} className="btn btn-primary pull-right" style={{width: '17%'}}>Change Name</button>
        </div>
      </div>
    );
  }
}

export default BasicChat;
