import React, { useState } from 'react';

export default function PatientLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (event: any) => {
    // maybe not any?
    event.preventDefault();
    const obj: any = {
      username,
      password,
      email,
      gender,
    };
    fetch('/api/patients', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        type="text"
        onChange={event => {
          setUsername(event.target.value);
        }}
      />
      <br />
      <input
        placeholder="Password"
        type="password"
        onChange={event => {
          setPassword(event.target.value);
        }}
      />
      <br />
      <select
        name="Select Gender"
        id=""
        onChange={event => {
          setGender(event.target.value);
        }}
      >
        <option value="none">Gender: neither / rather not say</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <br />
      <input
        placeholder="Email (optional)"
        type="text"
        onChange={event => {
          setEmail(event.target.value);
        }}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
