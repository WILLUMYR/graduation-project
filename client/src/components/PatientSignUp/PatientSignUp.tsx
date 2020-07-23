import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './PatientSignUp.css';

interface PatientSignUpInterface {
  token: string;
  setToken: Function;
}

const PatientSignUp: React.FC<PatientSignUpInterface> = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('female');
  const history = useHistory();

  const handleSubmit = async (event: any) => {
    // maybe not any?
    event.preventDefault();
    const obj: any = {
      username,
      password,
      email,
      gender,
    };

    fetch('/api/patients', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj),
    }).then(response => response.json())
      .then(data => {
        if (data.token) {
          props.setToken(data.token);
          history.push('/chat');
        }
      });
  };

  return (
    <>
      <header className="login__header">
        <Link className="header__title" to="/">
          Home
        </Link>
      </header>

      <main className="login__content">
        <section className="login__box">
          <h1 className="content__user">Create an account</h1>

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
            <input
              className="form__text"
              placeholder="Email (optional)"
              type="text"
              onChange={event => {
                setEmail(event.target.value);
              }}
            />
            <br />
            <select
              className="form__select"
              name="Select Gender"
              id=""
              onChange={event => {
                setGender(event.target.value);
              }}
            >
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="none">neither / rather not say</option>
            </select>
            <br />
            <input className="form__submit" type="submit" value="Create account" />
          </form>
        </section>
      </main>
    </>
  );
};

export default PatientSignUp;
