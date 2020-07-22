import React from 'react';
import { BrowserRouter, /*Link,*/ Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import LoginUser from './PatientLogin';
import LoginEmployee from './PsychologistLogin';
import Login from './Login';
import Chat from './Chat';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login/patient">
          <LoginUser />
        </Route>
        <Route exact path="/login/psychologist">
          <LoginEmployee />
        </Route>
        <Route exact path="/signup/patient">
          <LoginUser />
        </Route>
        <Route exact path="/signup/psychologist">
          <LoginEmployee />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/chat">
          <Chat />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
