import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <header className="home__header">
        <h1 className="header__title">
          OUR APP
        </h1>
        <Link className="header__login" to="/login">Login</Link>
      </header>

      <section className="home__content">
        <h2 className="content__title">What we do</h2>
        <h5 className="content__description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Illum nihil veniam sapiente dolores magnam nesciunt dolorem modi,
          rerum molestias ducimus exercitationem aliquam itaque eius sequi iste eum ipsum aperiam expedita.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Illum nihil veniam sapiente dolores magnam nesciunt dolorem modi,
          rerum molestias ducimus exercitationem aliquam itaque eius sequi iste eum ipsum aperiam expedita.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          <br></br><br></br>
          Illum nihil veniam sapiente dolores magnam nesciunt dolorem modi,
          rerum molestias ducimus exercitationem aliquam itaque eius sequi iste eum ipsum aperiam expedita.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Illum nihil veniam sapiente dolores magnam nesciunt dolorem modi,
          rerum molestias ducimus exercitationem aliquam itaque eius sequi iste eum ipsum aperiam expedita.
        </h5>
        <Link className="content__login" to="/login">Get started</Link>
      </section>
    </>
  );
}
