import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './PatientLogin.css';

const PatientLogin = (props: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const obj: any = {
      username,
      password,
    };
    fetch('/api/patients/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj),
    }).then(response => response.json())
      .then(data => {
        if (data.token) {
          props.saveToken(data.token);
          history.push('/chat');
        } else {
          alert('Login failed.');
        }
      });
  };

  return (
    <>
      <main className="login__content">
        <section className="login__box">
          <h1 className="content__user">Login</h1>

          <form onSubmit={handleSubmit}>
            <input
              className="form__text"
              placeholder="Username"
              type="text"
              onChange={event => {
                setUsername(event.target.value);
              }}
            />
            <br />
            <input
              className="form__text"
              placeholder="Password"
              type="password"
              onChange={event => {
                setPassword(event.target.value);
              }}
            />
            <br />
            <input className="form__submit" type="submit" value="Log in" />
          </form>
          <p>Dont have an account?</p>
          <Link className="form__submit" to="/signup/patient">Sign up</Link>
        </section>
      </main>
    </>
  );
}

export default PatientLogin;
