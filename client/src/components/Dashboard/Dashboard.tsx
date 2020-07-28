import React, { useState, useEffect, ReactNode } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import CaseCard from './CaseCard';
import CaseList from './CaseList';

export default function Dashboard(props: any) {
  const [cases, setCases] = useState();
  const [view, setView] = useState('YourCases');
  const [sidebar, setSidebar] = useState();

  const selectCase = (id: String) => {
    const newCase = cases.filter((item: { _id: String }) => item._id === id);
    setSidebar(newCase[0]);
  };

  const getCases = (url: any) => {
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

  return (
    <>
      <div className="dashboard__nav">
        <button
          className="dashboard__button"
          onClick={() => {
            getCases('api/cases/assigned');
          }}
        >
          Your Cases
        </button>
        <button
          className="dashboard__button"
          onClick={() => {
            getCases('api/cases/unassigned');
          }}
        >
          Unassigned Cases
        </button>
        <button
          className="dashboard__button"
          onClick={() => {
            getCases('api/cases');
          }}
        >
          All Cases
        </button>
      </div>
      <section className="dash__content">
        <div className="left__content">
          <CaseList cases={cases} selectCase={selectCase} />
        </div>

        <Sidebar sidebar={sidebar} />
      </section>
    </>
  );
}
