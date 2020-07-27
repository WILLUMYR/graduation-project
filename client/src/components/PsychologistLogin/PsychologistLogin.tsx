import React from 'react';
import '../Login.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function PsychologistLogin() {
  return (
    <>
      <main className="login__content">
        <section className="login__box">
          <h1 className="content__user">Log in</h1>

          <form>
            <input
              className="form__text"
              placeholder="Email"
              type="text"
            />
            <br />
            <input
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
