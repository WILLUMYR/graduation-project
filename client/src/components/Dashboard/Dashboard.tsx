import React, { useState, useEffect, ReactNode } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import CaseCard from './CaseCard';

export default function Dashboard(props: any) {
  const [cases, setCases] = useState();
  const [view, setView] = useState('YourCases');
  const [sidebar, setSidebar] = useState();

  const selectCase = (id: String) => {
    const newCase = cases.filter((item: { _id: String }) => item._id === id);
    setSidebar(newCase[0]);
  };

  const switchCase = (view: String) => {
    switch (view) {
      case 'YourCases':
        return (
          <CaseList url="api/cases/assigned" />
        );
      case 'Unassigned':
        return (
          <>
            <div>
              {getCases('api/cases/assigned')}
              {getCases('api/cases/unassigned')}
              {getCases('api/cases')}
            </div>
          </>
        );
      case 'AllCases':
        return (
          <>
            <div>
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
