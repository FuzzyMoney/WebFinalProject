import React from 'react';
import ReactDOM from 'react-dom';

import HelloComponent from './components/HelloComponent.jsx';

const element = (
  <div>
    <HelloComponent asPageHeader message="Hello from ReactApp.jsx" />
    <HelloComponent message="This is the second header" />
  </div>
);

ReactDOM.render(
  element, document.getElementById('app-root')
);
