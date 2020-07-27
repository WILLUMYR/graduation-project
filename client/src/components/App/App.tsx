import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Chat from '../Chat/Chat';
import PatientLogin from '../PatientLogin/PatientLogin';
import PatientSignUp from '../PatientSignUp/PatientSignUp';
import PsychologistLogin from '../PsychologistLogin/PsychologistLogin';
import PsychologistSignUp from '../PsychologistSignUp/PsychologistSignUp';
import Navbar from '../Navbar/Navbar';

const App = () => {
  const [token, setToken] = useState('');

  const saveToken = (token: string) => {
    window.localStorage.setItem('token', token);
    setToken(token);
  }

  useEffect(() => {
    if (token === '') {
      const localToken = window.localStorage.getItem('token')
      if (localToken) {
        setToken(localToken);
      }
    }
  })


  return (
    <BrowserRouter>
      <Navbar token={token} saveToken={saveToken} />
      <Switch>
        <Route exact path="/login/patient">
          <PatientLogin saveToken={saveToken} token={token} />
        </Route>
        <Route exact path="/signup/patient">
          <PatientSignUp saveToken={saveToken} token={token} />
        </Route>
        <Route exact path="/login/psychologist">
          <PsychologistLogin />
        </Route>
        <Route exact path="/chat">
          <Chat token={token} saveToken={saveToken} />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
