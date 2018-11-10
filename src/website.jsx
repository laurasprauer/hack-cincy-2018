import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history';

// import components
import MyApp from './myapp';

ReactDOM.render(
  (
    <Router history={history}>
      <MyApp />
    </Router>
  ), document.getElementById('website'),
);
