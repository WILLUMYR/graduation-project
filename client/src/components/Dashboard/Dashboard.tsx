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
        // data.map((item: { createdAt: Date; _id: String; issue: React.ReactNode }) => {
        //   return <CaseCard selectCase={selectCase} key={Math.random()} item={item} />;
        // });
      })
      .catch(err => console.error(err));
  };

  // const switchCase = (view: String) => {
  //   switch (view) {
  //     case 'YourCases':
  //       return (
  //         <CaseList url="api/cases/assigned" selectCase={selectCase} />
  //       );
  //     case 'Unassigned':
  //       return (
  //         <>
  //           <div>
  //             {getCases('api/cases/assigned')}
  //             {getCases('api/cases/unassigned')}
  //             {getCases('api/cases')}
  //           </div>
  //         </>
  //       );
  //     case 'AllCases':
  //       return (
  //         <>
  //           <div>
  //           </div>
  //         </>
  //       );
  //     default:
  //       return <p>Default</p>;
  //   }
  // };

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
        {/* <div className="left__content">{switchCase(view)}</div> */}
        <div className="left__content">
          {cases.map((item: { createdAt: Date; _id: String; issue: React.ReactNode }) => {
            return <CaseCard selectCase={selectCase} key={Math.random()} item={item} />;
          })}
        </div>
        <Sidebar sidebar={sidebar} />
      </section>
    </>
  );
}
