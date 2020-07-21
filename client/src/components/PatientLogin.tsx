import React, { useState } from 'react';

export default function PatientLogin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');


  return (
    <form action="/api/patients" method="post">
      <input placeholder="Username" type="text" onChange={event => {
        setUsername(event.target.value);
      }} />
      <br />
      <input placeholder="Password" type="password" />
      <br />
      <select name="Select Gender" id="">
        <option value="none">Gender: neither / rather not say</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <br />
      <input placeholder="Email (optional)" type="text" />
      <input type="submit" value="Submit" />
    </form>
  );
}
