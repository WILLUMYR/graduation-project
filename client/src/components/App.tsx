import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import LoginUser from './PatientLogin'
import LoginEmployee from './EmployeeLogin'
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login/user">
          <LoginUser />
        </Route>
        <Route exact path="/login/employee">
          <LoginEmployee />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
