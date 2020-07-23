import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './PatientLogin.css';

interface Props {
  token: string;
  setToken: Function;
}

const PatientLogin: React.FC<Props> = (props) => {
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
          props.setToken(data.token);
          history.push('/chat');
        } else {
          alert('Login failed.');
        }
      });
  };

  return (
    <>
      <header className="home__header">
        <Link className="header__title" to="/">Home</Link>
      </header>

      <main className="login__content">
        <section className="login__box">
          <h1 className="content__user">Sign in</h1>

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
            <input className="form__submit" type="submit" value="Sign in" />
          </form>

        </section>
      </main>
    </>
  );
}

export default PatientLogin;
