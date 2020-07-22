import React, { useState, useEffect } from 'react';
import { BrowserRouter, /*Link,*/ Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Chat from './Chat';
import PatientLogin from './PatientLogin';
import PatientSignUp from './PatientSignUp';
import PsychologistLogin from './PsychologistLogin';
import PsychologistSignUp from './PsychologistSignUp';

const App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    fetch('',)
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login/patient">
          <PatientLogin />
        </Route>
        <Route exact path="/login/psychologist">
          <PsychologistLogin />
        </Route>
        <Route exact path="/signup/patient">
          <PatientSignUp setToken={setToken} token={token} />
        </Route>
        <Route exact path="/signup/psychologist">
          <PsychologistSignUp />
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
