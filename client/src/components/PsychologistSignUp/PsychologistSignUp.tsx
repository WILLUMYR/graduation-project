import React from 'react';
import '../Login.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function PsychologistSignUp() {
  return (
    <>
      <main className="login__content">
        <section className="login__box">
          <h1 className="content__user">Create an account</h1>

          <form>
            <input
              className="form__text"
              placeholder="Full Name"
              type="text"
            />
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
            <input className="form__submit" type="submit" value="Sign up" />
          </form>
          <p>Dont have an account?</p>
          <Link className="form__goBack" to="/login/psychologist">Go back</Link>
          <p className="PS">This Login page is only for professional Psychologists.<br></br><br></br>If you are looking for help from one,
          <br></br> please use our user login and post a case containing your issue. </p>
          <Link className="form__goBack" to="/login/patient">User login</Link>

        </section>
      </main>
      <Footer />
    </>
  );
}
