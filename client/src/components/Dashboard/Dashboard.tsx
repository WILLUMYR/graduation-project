import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import CaseList from './CaseList';
import './Dashboard.css';

interface props {
  token: string;
  saveToken: (arg0: string) => void;
  setCurrentCase: any;
}

export const Dashboard: React.FC<props> = (props) => {
  const [cases, setCases] = useState([]);
  const [buttonView, setButtonView] = useState('YourCases');
  const [sidebar, setSidebar] = useState();

  useEffect(() => {
    fetch('/api/cases/assigned', {
      headers: {
        'x-auth-token': props.token,
      },
    }).then(res => {
      return res.json();
    }).then((data) => {
      return setCases(data)
    })
  }, [props.token])

  const getCases = (url: string) => {
    fetch(url, {
      headers: {
        'x-auth-token': props.token,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCases(data);
      })
      .catch(err => console.error(err));
  };

  const selectCase = (id: String) => {
    const newCase = cases.filter((item: { _id: String }) => item._id === id);
    setSidebar(newCase[0]);
  };

  return (
    <>
      <div className="dashboard__nav">
        <button
          className={buttonView === 'YourCases' ? "dashboard__button" : "dashboard__button--not"}
          onClick={() => {
            getCases('api/cases/assigned');
            setButtonView('YourCases');
          }}
        >
          Your Cases
        </button>
        <button
          className={buttonView === 'Unassigned' ? "dashboard__button" : "dashboard__button--not"}
          onClick={() => {
            getCases('api/cases/unassigned');
            setButtonView('Unassigned');
          }}
        >
          Unassigned Cases
        </button>
        <button
          className={buttonView === 'AllCases' ? "dashboard__button" : "dashboard__button--not"}
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

        <Sidebar setSidebar={setSidebar} sidebar={sidebar} buttonView={buttonView} token={props.token} setCurrentCase={props.setCurrentCase} />
      </section>
    </>
  );
}
