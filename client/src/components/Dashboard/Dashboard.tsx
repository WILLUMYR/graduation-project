import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import CaseCard from './CaseCard';

export default function Dashboard(props: any) {
  const [cases, setCases] = useState();
  const [view, setView] = useState('YourCases');
  const [sidebar, setSidebar] = useState();

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
        data.map((item: { createdAt: Date; _id: String; issue: React.ReactNode }) => {
          return <CaseCard selectCase={selectCase} key={Math.random()} item={item} />;
        });
      })
      .catch(err => console.error(err));
  };

  const selectCase = (id: String) => {
    const newCase = cases.filter((item: { _id: String }) => item._id === id);
    setSidebar(newCase[0]);
  };

  const switchCase = (view: String) => {
    switch (view) {
      case 'YourCases':
        return (
          <>
            <div>
              {() => {
                getCases('api/cases/assigned');
              }}
            </div>
          </>
        );
      case 'Unassigned':
        return (
          <>
            <div>
              {() => {
                getCases('api/cases/unassigned');
              }}
            </div>
          </>
        );
      case 'AllCases':
        return (
          <>
            <div>
              {() => {
                getCases('api/cases');
              }}
            </div>
          </>
        );
      default:
        return <p>Default</p>;
    }
  };

  return (
    <>
      <div className="dashboard__nav">
        <button
          className="dashboard__button"
          onClick={() => {
            setView('YourCases');
          }}
        >
          Your Cases
        </button>
        <button
          className="dashboard__button"
          onClick={() => {
            setView('Unassigned');
          }}
        >
          Unassigned Cases
        </button>
        <button
          className="dashboard__button"
          onClick={() => {
            setView('AllCases');
          }}
        >
          All Cases
        </button>
      </div>
      <section className="dash__content">
        <div className="left__content">{switchCase(view)}</div>
        <Sidebar sidebar={sidebar} />
      </section>
    </>
  );
}
