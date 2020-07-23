import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChatBubble from './ChatBubbles/ChatBubbles';
import './Chat.css';

const Chat = (props: any) => {
  const [issue, setIssue] = useState('');
  const [content, setContent] = useState();
  const [message, setMessage] = useState();

  const history = useHistory();

  useEffect(() => {
    if (props.token === '' && !window.localStorage.getItem('token')) {
      history.push('/login/patient');

    }
    // check for existing case
  })

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetch('/api/cases', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-auth-token': props.token
      },
      body: JSON.stringify({ issue }),
    }).then(response => {
      if (response.status !== 201) return alert('Error')

      fetch('/api/patients', {
        headers: {
          'content-type': 'application/json',
          'x-auth-token': props.token
        },
      }).then((res) => {
        return res.json()
      }).then((data) => {
        setContent(data);
        const json = JSON.stringify(data)
        window.localStorage.setItem('case', json);
      }).catch(err => { console.log(err) });
    });
  }

  if (!content || !window.localStorage.getItem('case')) {
    return (
      <>
        <main className="chat__content">
          <section className="issue__box">
            <h1 className="issue__title">Please describe your issue</h1>
            <form className="issue__form" onSubmit={handleSubmit}>
              <textarea
                className="issue__input"
                placeholder="Please describe your problem!"
                onChange={event => {
                  setIssue(event.target.value);
                }}
              />
              <input className="issue__button" type="submit" value="Submit issue" />
            </form>
          </section>
        </main>
      </>
    );
  } else {
    console.log(content);
    // fetch(`/cases/${id}`);
    return (
      <>
        <main className="chat__content">
          <section className="issue__content">
            <h1>Thank you for submiting, a psychologist will respond to you as soon as possible.</h1>
            <p className="issue__text">{content.cases[0].issue}</p>
          </section>
          <section className="chat__messages">
            {content.cases[0].messages.map((message: { text: React.ReactNode; }) => {
              return <ChatBubble key={Math.random()} message={message} />
            })}
          </section>
          <form className="message__form" action="submit">
            <textarea
              className="message__input"
              placeholder="Your message..."
              onChange={event => {
                setMessage(event.target.value);
              }}></textarea>
            <input className="message__button" type="submit" />
          </form>
        </main>
      </>
    )
  }
}

export default Chat;