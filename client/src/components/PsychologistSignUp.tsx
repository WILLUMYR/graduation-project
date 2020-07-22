import React from 'react';

export default function PsychologistSignUp() {
  return (
    <form action="">
      <input placeholder="Email" type="text" />
      <br />
      <input placeholder="Full Name" type="text" />
      <br />
      <input placeholder="Password" type="password" />
      <input className="form__submit" type="submit" value="Sign Up" />
    </form>
  );
}
