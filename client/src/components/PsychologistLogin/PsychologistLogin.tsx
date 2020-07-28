import React, { useState } from 'react';
import '../Login.css';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../Footer/Footer';

interface props {
  saveToken: (arg0: string) => void
}

interface submitObj {
  email: string;
  password: string;
}

export const PsychologistLogin: React.FC<props> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const obj: submitObj = {
      email,
      password,
    };

    fetch('/api/psychologists/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj),
    }).then(response => response.json())
      .then(data => {
        if (data.token) {
          props.saveToken(data.token);
          history.push('/dashboard');
        } else {
          alert('Login failed.');
        }
      });
  };

  return (
    <>
      <main className="login__content">
        <section className="login__box">
          <h1 className="content__user">Log in</h1>

          <form onSubmit={handleSubmit}>
            <input
              onChange={event => { setEmail(event.target.value) }}
              className="form__text"
              placeholder="Email"
              type="text"
            />
            <br />
            <input
              onChange={event => { setPassword(event.target.value) }}
              className="form__text"
              placeholder="Password"
              type="password"
            />
            <br />
            <input className="form__submit" type="submit" value="Log in" />
          </form>
          <p className="PS">This Login page is only for professional Psychologists.<br></br>If you are looking for help from one,
              please use our user login and post a case containing your issue. </p>
          <Link className="form__goBack" to="/login/patient">User login</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
