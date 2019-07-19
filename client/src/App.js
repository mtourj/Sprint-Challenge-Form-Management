import React from 'react';
import './App.css';

import TopSecret from './components/TopSecret';
import Auth from './components/Auth';

import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={TopSecret} />
      <Route path='/login' component={Auth} />
    </div>
  );
}

export default App;
