import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  return (
    <>
      <header className="login__header">
        <Link className="header__title" to="/">
          Home
        </Link>
      </header>

      <main className="login__content">
        <section className="content__box">
          <h1 className="content__user">Are you a user?</h1>
          <h3 className="content__info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur dicta porro suscipit, unde dolores
            totam nemo soluta quos dolorum dolore repellat reprehenderit ullam illum voluptas, debitis tempora quasi
            commodi exercitationem!
          </h3>
          <Link className="content__link" to="/login/patient">
            Login As User
          </Link>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Link className="content__link" to="/signup/patient">
            Sign Up As User
          </Link>
        </section>
        <section className="content__box">
          <h1 className="content__user">Are you a Professional?</h1>
          <h3 className="content__info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur dicta porro suscipit, unde dolores
            totam nemo soluta quos dolorum dolore repellat reprehenderit ullam illum voluptas, debitis tempora quasi
            commodi exercitationem!
          </h3>
          <Link className="content__link" to="/login/psychologist">
            Login As A Professional
          </Link>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Link className="content__link" to="/signup/psychologist">
            Sign Up As A Professional
          </Link>
        </section>
      </main>
    </>
  );
}
