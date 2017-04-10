import React from 'react';
import ReactDOM from 'react-dom';

import MyComponent from './components/MyComponent.jsx';
import Clock from './components/Clock.jsx';
import Movie from './components/Movie.jsx';

function draw() {
  const element = (
    <div>
      <MyComponent asPageHeader message="Hello from ReactApp.jsx" />
      <Clock />
      <Movie movieID={5} />
    </div>
  );

  ReactDOM.render(
    element, document.getElementById('app-root')
  );
}

setInterval(draw, 1000);
