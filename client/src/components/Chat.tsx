import React, { useState } from 'react';

export default function Chat() {
  const cases: Array<String> = [];
  const [message, setMessage] = useState('');

  const handleSubmit = (event: any) => {
    // maybe not any?
    event.preventDefault();
    const obj: any = {
      patientId: '5f16edf1f4368bb6ea96c6ee',
      issue: message,
      messages: [message],
    };
    fetch('/api/patients', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj),
    });
  };

  if (cases.length === 0) {
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
  }
}
