import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import ChatBubble from './ChatBubbles/ChatBubbles';
import './Chat.css';

const ChatPsychologist = (props: any) => {
  const [issue, setIssue] = useState('');
  const [content, setContent] = useState();
  const [message, setMessage] = useState();
  const [userFeedback, setUserFeedback] = useState('');

  const inputEl: any = useRef(null);

  const history = useHistory();

  useEffect(() => {
    if (props.token === '' && !window.localStorage.getItem('token')) {
      history.push('/login/patient');
    } else {
      fetch('/api/patients', {
        headers: {
          'content-type': 'application/json',
          'x-auth-token': props.token,
        },
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setContent(data);
          const json = JSON.stringify(data);
          window.localStorage.setItem('case', json);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const handleResponse = (response: any) => {
    if (response.status !== 201) return alert('Error');

    fetch('/api/patients', {
      headers: {
        'content-type': 'application/json',
        'x-auth-token': props.token,
      },
    }).then(res => res.json())
      .then(data => {
        setContent(data);
        const json = JSON.stringify(data);
        window.localStorage.setItem('case', json);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleSubmitForm = (event: any) => {
    event.preventDefault();
    fetch('/api/cases', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-auth-token': props.token,
      },
      body: JSON.stringify({ issue }),
    }).then(response => {
      handleResponse(response);
    })
  };

  const messageHandleSubmit: any = (event: any) => {
    event.preventDefault();
    fetch(`api/cases/${content.cases[0]._id}/message`, {
      method: "PUT",
      headers: {
        'content-type': 'application/json',
        'x-auth-token': props.token,
      },
      body: JSON.stringify({ text: message })
    }).then((response) => {
      handleResponse(response);
    })

    inputEl.current.value = '';
    window.scrollTo(0, document.body.scrollHeight);
  }

  const closeCase = async () => {
    const results = await fetch(`/api/cases/close/${content.cases[0]._id}`, {
      method: "PUT",
      headers: {
        "x-auth-token": props.token,
      }
    })

    if (results.status === 200) {
      setUserFeedback('Case has been closed')
      setTimeout(() => {
        setUserFeedback('');
        window.location.reload();
      }, 4000)
    } else {
      setUserFeedback('Something went wrong, please try again later. ')
      setTimeout(() => {
        setUserFeedback('')
        window.location.reload();
      }, 4000)
    }
  }

  if (!content || content.cases.length === 0 || !window.localStorage.getItem('case')) {
    return (
      <>
        <main className="chat__content">
          <section className="issue__box">
            <h1 className="issue__title">Please describe your issue</h1>
            <form className="issue__form" onSubmit={handleSubmitForm}>
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
    return (
      <>
        <main className="chat__content">
          <section className="issue__content">
            <h1>Your case has been sucessfully submitted</h1>
            <p className="issue__text">{content.cases[0].issue}</p>
          </section>
          <button onClick={() => { closeCase() }}>Close case</button> <p>{userFeedback}</p>
          <section className="chat__messages">
            {content.cases[0].messages.map((message: { text: React.ReactNode }) => {
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
