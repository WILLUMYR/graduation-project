import React from 'react';
import './PsychologistLogin.css';

export default function PsychologistLogin() {
  return (
    <form action="">
      <input placeholder="Email" type="text" />
      <br />
      <input placeholder="Password" type="password" />
      <input className="form__submit" type="submit" value="Login" />
    </form>
  );
}
