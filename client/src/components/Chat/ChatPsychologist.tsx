import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChatBubble from './ChatBubbles/ChatBubbles';
import './Chat.css';
import moment from 'moment';

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
  const [showNotes, setShowNotes] = useState<boolean>(false);

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
  }, [history, props.token, props.currentCase]);

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
      headers: {
        'content-type': 'application/json',
        'x-auth-token': props.token,
      },
      body: JSON.stringify({ text: note }),
    })
      .then(response => {
        handleResponse(response);
      })
      .catch(err => {
        console.error(err);
      });

    setNote('');
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
    })
      .then(response => {
        handleResponse(response);
      })
      .catch(err => {
        console.error(err);
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
        <div className="all__content">
          <main className="chat__content">
            <div className="action__buttons">
              <button
                className="goBack__button"
                onClick={() => {
                  history.goBack();
                }}
              >
                Go back
            </button>
              <button
                onClick={() => {
                  setShowNotes(!showNotes);
                }}
                className={showNotes ? 'show__notes__button' : 'hide__notes__button'}
              >
                Case Notes
            </button>
            </div>
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
          <aside className={showNotes ? 'show__notes' : 'hide__notes'}>
            <button
              onClick={() => {
                setShowNotes(!showNotes);
              }}
            >
              x
            </button>
            {content.notes.map(note => {
              return (
                <div className="note__card" key={Math.random()}>
                  <h4>{note.text}</h4>
                  <p>{moment(note.createdAt).format('L')}</p>
                </div>
              );
            })}
            <form className="note__form" action="submit" onSubmit={submitNote}>
              <input className="note__form__input"
                value={note}
                onChange={event => {
                  setNote(event.target.value);
                }}
                type="text"
              />
              <input className="note__form__button" type="submit" />
            </form>
          </aside>
        </div>
      </>
    );
  }
};
