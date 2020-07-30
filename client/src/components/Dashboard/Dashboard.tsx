import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import history from '../history';
import './Dashboard.css';
import Sidebar from './Sidebar';
import CaseList from './CaseList';

interface Props {
  token: string;
  setCurrentCase: any;
}

const Dashboard: React.FC<Props> = (props: Props) => {
  const [cases, setCases] = useState([]);
  const [buttonView, setButtonView] = useState('YourCases');
  const [sidebar, setSidebar] = useState();

  useEffect(() => {
    if (props.token === '' && !window.localStorage.getItem('token')) {
      history.push('/login/psychologist');
    }
  });

  useEffect(() => {
    fetch('/api/cases/assigned', {
      headers: {
        'x-auth-token': props.token,
      },
    }).then((res) => res.json()).then((data) => setCases(data));
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.token]);

  const getCases = (url: string) => {
    fetch(url, {
      headers: {
        'x-auth-token': props.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCases(data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  };

  const selectCase = (id: String) => {
    // eslint-disable-next-line no-underscore-dangle
    const newCase = cases.filter((item: { _id: String }) => item._id === id);
    setSidebar(newCase[0]);
  };

  return (
    <>
      <div className="dashboard__nav">
        <button
          className={buttonView === 'YourCases' ? 'dashboard__button' : 'dashboard__button--not'}
          type="button"
          onClick={() => {
            getCases('api/cases/assigned');
            setButtonView('YourCases');
          }}
        >
          Your Cases
        </button>
        <button
          className={buttonView === 'Unassigned' ? 'dashboard__button' : 'dashboard__button--not'}
          type="button"
          onClick={() => {
            getCases('api/cases/unassigned');
            setButtonView('Unassigned');
          }}
        >
          Unassigned Cases
        </button>
        <button
          className={buttonView === 'AllCases' ? 'dashboard__button' : 'dashboard__button--not'}
          type="button"
          onClick={() => {
            getCases('api/cases');
            setButtonView('AllCases');
          }}
        >
          All Cases
        </button>
      </div>
      <section className="dash__content">
        <div className="left__content">
          <CaseList cases={cases} selectCase={selectCase} />
        </div>

        <Sidebar
          setSidebar={setSidebar}
          sidebar={sidebar}
          buttonView={buttonView}
          token={
            // eslint-disable-next-line react/destructuring-assignment
            props.token
          }
          setCurrentCase={
            // eslint-disable-next-line react/destructuring-assignment
            props.setCurrentCase
          }
        />
      </section>
    </>
  );
};

export default Dashboard;
