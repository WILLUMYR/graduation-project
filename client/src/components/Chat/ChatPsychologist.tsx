import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import ChatBubble from './ChatBubbles/ChatBubbles';
import './Chat.css';

interface props {
  token: string;
  saveToken: (arg0: string) => void;
  currentCase: any;
  setCurrentCase: any;
}

interface content {
  _id: string;
  issue: string;
  notes: Array<{
    text: string;
    createdAt: number;
  }>;
  messages: Array<{
    text: string;
  }>;
}

const initContent = {
  _id: '',
  issue: '',
  messages: [{ text: '' }],
  notes: [
    {
      text: '',
      createdAt: Date.now(),
    },
  ],
};

export const ChatPsychologist: React.FC<props> = props => {
  const [content, setContent] = useState<content>(initContent);
  const [message, setMessage] = useState<string>();
  const [userFeedback, setUserFeedback] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const history = useHistory();

  useEffect(() => {
    if (props.token === '' && !window.localStorage.getItem('token')) {
      history.push('/login/psychologist');
      return;
    }

    if (!props.currentCase) {
      if (window.localStorage.getItem('caseId')) {
        console.log('number 2');
        history.push('/dashboard');
        return;
      }

      props.setCurrentCase(window.localStorage.getItem('caseId'));
    }
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
        window.localStorage.setItem('caseId', data._id);
        setContent(data);
      })
      .catch(err => {
        console.log(err);
      });
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

  const submitNote = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`/api/cases/${content._id}/note`, {
      method: 'PUT',
      headers: { 'x-auth-token': props.token },
      body: JSON.stringify({ text: note })
    })
  };

  const messageHandleSubmit = (event: React.FormEvent) => {
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

    setMessage('');
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
          <button
            className="goBack__button"
            onClick={() => {
              history.goBack();
            }}
          >
            Go back
          </button>
          <section className="issue__content">
            <h1>CASE ID: {content._id}</h1>
            <p className="issue__text">{content.issue}</p>
          </section>
          <p>{userFeedback}</p>
          <section className="chat__messages">
            {content.messages.map((message: { text: React.ReactNode }) => {
              return <ChatBubble key={Math.random()} message={message} />;
            })}
          </section>
          <button>Case Notes</button>
          <aside>
            {content.notes.map(note => {
              return (
                <>
                  <h4>{note.text}</h4>
                  <p>{note.createdAt}</p>
                </>
              );
            })}
            <form action="">
              <input onChange={(event) => {
                setNote(event.target.value);
              }} type="text" />
              <input type="submit" />
            </form>
          </aside>
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
