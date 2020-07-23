import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';


export default function Navbar(props: any) {
  const history = useHistory();
  const logout = () => {
    props.saveToken('');
    history.push('/');
  }

  if (props.token === '') {
    return (
      <header className="home__header">
        <Link className="header__title" to="/">
          Home
        </Link>
        <Link className="header__link" to="/">
          Login as a psychologist
        </Link>
      </header>
    )
  } else {
    return (
      <header className="home__header">
        <Link className="header__title" to="/">
          Home
        </Link>
        <button className="header__link" onClick={() => { logout() }}>LogOut</button>
      </header>
    )
  }
}
