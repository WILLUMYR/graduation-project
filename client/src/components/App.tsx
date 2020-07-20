import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
      <div className="App">
        <p>hello setup</p>
      </div>
    </BrowserRouter>
  );
}

export default App;
