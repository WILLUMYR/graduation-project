import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChatBubble from './ChatBubbles/ChatBubbles';
import './Chat.css';

interface props {
  token: string
  saveToken: (arg0: string) => void
}

interface content {
  cases: Array<{
    _id: string;
    issue: string;
    messages: Array<{
      text: string
    }>
  }>
}

const initContent = {
  cases: [
    {
      _id: '',
      issue: '',
      messages: [
        { text: '' }
      ]
    }
  ]
}

export const Chat: React.FC<props> = (props) => {
  const [issue, setIssue] = useState<string>('');
  const [content, setContent] = useState<content>(initContent);
  const [message, setMessage] = useState<string>();
  const [userFeedback, setUserFeedback] = useState<string>('');

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

  interface response {
    status: number;
  }

  const handleResponse = (response: response) => {
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

  const handleSubmitForm = (event: React.FormEvent) => {
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

  const messageHandleSubmit = (event: React.FormEvent) => {
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

    setMessage('');
    window.scrollTo(0, document.body.scrollHeight);
  }

  const closeCase = async () => {
    const results = await fetch(`/api/cases/${content.cases[0]._id}/close`, {
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
              className="message__input"
              placeholder="Your message..."
              value={message}
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
