import React, { useState, useEffect } from 'react';

export default function Chat() {
  const [newCase, setCase] = useState('');
  const [message, setMessage] = useState('');

  // useEffect(() => {

  // }, [case])

  const handleSubmit = (event: any) => {
    // maybe not any?
    event.preventDefault();
    const obj: any = {
      patientId: '5f16edf1f4368bb6ea96c6ee',
      issue: message,
      messages: [],
    };
    fetch('/api/cases', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj),
    });
    setCase(message);
  };

  if (newCase.length === 0) {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Please describe your problem!"
          onChange={event => {
            setMessage(event.target.value);
          }}
        />
        <input type="submit" placeholder="Submit" />
      </form>
    );
  } else {
    fetch(`/cases/${id}`);
    return <div></div>;
  }
}
