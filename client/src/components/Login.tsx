import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <header className="home__header">
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
          <Link className="content__link" to="/signup/patient">
            Sign Up As User
          </Link>
        </section>
        <section className="content__box">
          <h1 className="content__user">Are you an employee?</h1>
          <h3 className="content__info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur dicta porro suscipit, unde dolores
            totam nemo soluta quos dolorum dolore repellat reprehenderit ullam illum voluptas, debitis tempora quasi
            commodi exercitationem!
          </h3>
          <Link className="content__link" to="/login/psychologist">
            Login As An Employee
          </Link>
          <Link className="content__link" to="/signup/psychologist">
            Sign Up As An Employee
          </Link>
        </section>
      </main>
    </>
  );
}
