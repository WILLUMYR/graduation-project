import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Chat.css';

interface Chat {
  token: string;
  setToken: Function;
}

const Chat: React.SFC<Chat> = (props) => {
  const [newCase, setCase] = useState('');
  const [issue, setIssue] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();

  const logout = () => {
    props.setToken('');
    history.push('/');
  }

  // useEffect(() => {
  //   if (props.token) {
  //     fetch('/api/patients', {
  //       headers: {
  //         'content-type': 'application/json',
  //         'x-auth-token': props.token
  //       },
  //     })
  //   }
  // }, [])

  useEffect(() => {
    if (props.token === '') {
      history.push('/login')
    }
  }, [])

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const obj: any = {
      patientId: '5f16edf1f4368bb6ea96c6ee',
      issue,
      messages: [],
    };
    setCase(issue);
  };

  if (newCase.length === 0) {
    return (
      <>
        <header className="home__header">
          <Link className="header__title" to="/">
            Home
        </Link>
        </header>

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
          <button onClick={() => { logout() }}>LogOut</button>
        </main>
      </>
    );
  } else {
    // fetch(`/cases/${id}`);
    return (
      <>
        <header className="home__header">
          <Link className="header__title" to="/">
            Home
        </Link>
        </header>

        <main className="chat__content">
          <section className="issue__content">
            <h1>Issue ID: 2103198590231204</h1>
            <p className="issue__text">{newCase}</p>
          </section>
          <section className="chat__messages">
            <div className="message__box">
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit veniam laborum odio porro expedita iste fuga vel quia iure, repellat quibusdam officiis voluptate quo, culpa quos debitis quod error inventore.</p>
              <div className="message__img"></div>
            </div>
          </section>
          <form className="message__form" action="submit">
            <textarea className="message__input" placeholder="Your message..." onChange={event => {
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
