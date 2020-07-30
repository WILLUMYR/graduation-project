import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import ChatBubble from './ChatBubbles/ChatBubbles';
import './Chat.css';

interface Props {
  token: string;
  currentCase: any;
  setCurrentCase: any;
}

interface Content {
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

const InitContent = {
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

const ChatPsychologist: React.FC<Props> = (props: Props) => {
  const [content, setContent] = useState<Content>(InitContent);
  const [message, setMessage] = useState<string>();
  const [userFeedback/* ,setUserFeedback */] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const history = useHistory();

  const { token, currentCase, setCurrentCase } = props;

  useEffect(() => {
    if (token === '' && !window.localStorage.getItem('token')) {
      history.push('/login/psychologist');
      return;
    }

    if (!currentCase) {
      if (window.localStorage.getItem('caseId')) {
        history.push('/dashboard');
        return;
      }

      setCurrentCase(window.localStorage.getItem('caseId'));
    }
    fetch(`/api/cases/${currentCase}`, {
      headers: {
        'content-type': 'application/json',
        'x-auth-token': token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const json = JSON.stringify(data);
        window.localStorage.setItem('case', json);
        // eslint-disable-next-line no-underscore-dangle
        window.localStorage.setItem('caseId', data._id);
        setContent(data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      }); // eslint-disable-next-line react/destructuring-assignment
  }, [history, token, currentCase, setCurrentCase]);

  interface Response {
    status: number;
  }

  const handleResponse = (response: Response) => {
    // eslint-disable-next-line no-alert
    if (response.status !== 201) return alert('Error');
    // eslint-disable-next-line no-underscore-dangle
    fetch(`/api/cases/${content._id}`, {
      headers: {
        'x-auth-token': props.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        const json = JSON.stringify(data);
        window.localStorage.setItem('case', json);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
    return undefined;
  };

  const submitNote = (event: React.FormEvent) => {
    event.preventDefault();
    // eslint-disable-next-line no-underscore-dangle
    fetch(`/api/cases/${content._id}/note`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'x-auth-token': props.token,
      },
      body: JSON.stringify({ text: note }),
    })
      .then((response) => {
        handleResponse(response);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });

    setNote('');
  };

  const messageHandleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // eslint-disable-next-line no-underscore-dangle
    fetch(`/api/cases/${content._id}/message`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'x-auth-token': props.token,
      },
      body: JSON.stringify({ text: message }),
    })
      .then((response) => {
        handleResponse(response);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
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
  }
  return (
    <>
      <div className="all__content">
        <main className="chat__content">
          <button
            type="button"
            className="goBack__button"
            onClick={() => {
              history.goBack();
            }}
          >
            Go back
          </button>
          <section className="issue__content">

            <h1>
              CASE ID:
              {// eslint-disable-next-line no-underscore-dangle
                content._id
              }
            </h1>
            <p className="issue__text">{content.issue}</p>
          </section>
          <p>{userFeedback}</p>
          <section className="chat__messages">
            {// eslint-disable-next-line max-len
              content.messages.map((oneMessage: any) => <ChatBubble key={Math.random()} message={oneMessage} />)
            }
          </section>
          <button
            type="button"
            onClick={() => {
              setShowNotes(!showNotes);
            }}
            className={showNotes ? 'show__notes__button' : 'hide__notes__button'}
          >
            Case Notes
          </button>

          <form onSubmit={messageHandleSubmit} className="message__form" action="submit">
            <textarea
              className="message__input"
              placeholder="Your message..."
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
            <input className="message__button" type="submit" />
          </form>
        </main>
        <aside className={showNotes ? 'show__notes' : 'hide__notes'}>
          <button
            type="button"
            onClick={() => {
              setShowNotes(!showNotes);
            }}
          >
            x
          </button>
          {content.notes.map((oneNote) => (// eslint-disable-next-line arrow-body-style
            <div className="note__card" key={Math.random()}>
              <h4>{oneNote.text}</h4>
              <p>{moment(oneNote.createdAt).format('L')}</p>
            </div>
          ))}
          <form action="submit" onSubmit={submitNote}>
            <input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              type="text"
            />
            <input type="submit" />
          </form>
        </aside>
      </div>
    </>
  );
};

export default ChatPsychologist;
