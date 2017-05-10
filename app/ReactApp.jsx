import React from 'react';
import ReactDOM from 'react-dom';
import HelloComponent from './components/HelloComponent.jsx';
import BasicChat from './components/BasicChat.jsx';

const element = (
  <div>
    <HelloComponent asPageHeader message="Socket.IO Chat App" />
      <BasicChat />
  </div>
);

ReactDOM.render(
  element, document.getElementById('app-root')
);
