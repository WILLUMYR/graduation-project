import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <header>
        <h1>
          Home
        </h1>
      </header>

      <div>
        <Link className="" to="/login">Get started</Link>
      </div>
    </>
  );
}
