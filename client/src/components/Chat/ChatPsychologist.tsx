import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import ChatBubble from './ChatBubbles/ChatBubbles';
import './Chat.css';

const ChatPsychologist = (props: any) => {
  const [issue, setIssue] = useState('');
  const [content, setContent]: any = useState();
  const [message, setMessage] = useState();
  const [userFeedback, setUserFeedback] = useState('');

  const inputEl: any = useRef(null);

  const history = useHistory();

  useEffect(() => {
    if (props.currentCase === undefined) setContent(window.localStorage.getItem('case'))

    if (props.token === '' && !window.localStorage.getItem('token')) {
      history.push('/login/psychologist');
    } else {
      fetch(`/api/cases/${props.currentCase}`, {
        headers: {
          'content-type': 'application/json',
          'x-auth-token': props.token,
        },
      })
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(data => {
          console.log(data);
          const json = JSON.stringify(data);
          window.localStorage.setItem('case', json);
          setContent(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const handleResponse = (response: any) => {
    if (response.status !== 201) return alert('Error');

    fetch(`/api/cases/${content._id}`, {
      headers: {
        'x-auth-token': props.token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setContent(data);
        const json = JSON.stringify(data);
        window.localStorage.setItem('case', json);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const messageHandleSubmit: any = (event: any) => {
    event.preventDefault();
    fetch(`/api/cases/${content._id}/message`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'x-auth-token': props.token,
      },
      body: JSON.stringify({ text: message }),
    }).then(response => {
      handleResponse(response);
    });

    inputEl.current.value = '';
    window.scrollTo(0, document.body.scrollHeight);
  };

  if (!content) {
    return (
      <>
        <main className="chat__content">
          <div>Loading</div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <main className="chat__content">
          <section className="issue__content">
            <h1>Your case has been sucessfully submitted</h1>
            <p className="issue__text">{content.issue}</p>
          </section>
          <button onClick={() => {
            history.goBack()
          }}>Go back</button>
          <p>{userFeedback}</p>
          <section className="chat__messages">
            {content.messages.map((message: { text: React.ReactNode }) => {
              return <ChatBubble key={Math.random()} message={message} />;
            })}
          </section>
          <form onSubmit={messageHandleSubmit} className="message__form" action="submit">
            <textarea
              ref={inputEl}
              className="message__input"
              placeholder="Your message..."
              onChange={event => {
                setMessage(event.target.value);
              }}
            ></textarea>
            <input className="message__button" type="submit" />
          </form>
        </main>
      </>
    );
  }
};

export default ChatPsychologist;
