import React, { useState, useEffect } from 'react';
import { BrowserRouter, /*Link,*/ Route, Switch } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import PatientLogin from '../PatientLogin/PatientLogin';
import PatientSignUp from '../PatientSignUp/PatientSignUp';
import PsychologistLogin from '../PsychologistLogin/PsychologistLogin';
import PsychologistSignUp from '../PsychologistSignUp/PsychologistSignUp';

const App = () => {
  const [token, setToken] = useState('');

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
          <Chat token={token} />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
