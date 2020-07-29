import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Footer from '../Footer/Footer';

export const Home: React.FC = () => {
  return (
    <>
      <section className="home__content">
        <h2 className="content__title">Welcome!</h2>
        <h5 className="content__description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Illum nihil veniam sapiente dolores magnam nesciunt dolorem modi,
          rerum molestias ducimus exercitationem aliquam itaque eius sequi iste eum ipsum aperiam expedita.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Illum nihil veniam sapiente dolores magnam nesciunt dolorem modi,
          rerum molestias ducimus exercitationem aliquam itaque eius sequi iste eum ipsum aperiam expedita.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </h5>
        <h3>Let us help you.</h3>
        <Link className="content__login" to="/signup/patient">Get started</Link>
        <h5 className="content__description">Already have an account?</h5>
        <Link className="content__signup" to="/login/patient">Log in</Link>
      </section>
      <Footer />
    </>
  );
}
