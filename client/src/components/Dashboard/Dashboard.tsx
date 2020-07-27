import React, { useState, useEffect } from 'react'
import './Dashboard.css';
import moment from 'moment';

export default function Dashboard(props: any) {
  const [cases, setCases] = useState();
  const [view, setView] = useState('YourCases');

  const getCases = () => {
    fetch('/api/cases', {
      headers: {
        "x-auth-token": props.token
      }
    }).then((response) => {
      return response.json()
    })
      .then((data) => {
        console.log(data.cases);
        return setCases(data.cases)
      }).catch(err => console.error(err))
  }

  useEffect(() => {
    getCases();
  }, [])


  const switchCase = (view: String) => {
    switch (view) {
      case 'YourCases':
        return (
          <p>Your cases</p>
        )
      case 'Unassigned':
        return (
          <p>Unassigned Cases</p>
        )
      case 'AllCases':
        return (
          <>
            {cases.map((item: { createdAt: Date; _id: React.ReactNode; issue: React.ReactNode; }) => {
              return (
                <div className="content__card" key={Math.random()}>
                  <h2>Case Created:</h2>
                  <h2>Case ID:</h2>
                  <h2>Issue:</h2>
                  <h2>{moment(item.createdAt).format('L')}</h2>
                  <h2>{item._id}</h2>
                  <h2>{item.issue}</h2>
                </div>
              )
            })}
          </>
        )
      default:
        return (<p>Default</p>)
    }
  }

  return (
    <>
      <div>
        <button className="dashboard__button" onClick={() => { setView('YourCases') }}>Your Cases</button>
        <button className="dashboard__button" onClick={() => { setView('Unassigned') }}>Unassigned Cases</button>
        <button className="dashboard__button" onClick={() => { setView('AllCases') }}>All Cases</button>
      </div>
      <section className="dash__content">
        <div className="left__content">
          {switchCase(view)}
        </div>
        <div className="right__content">
        </div>
      </section>
    </>
  )

  // if (cases !== undefined) {
  //   return (
  //     <section>
  //       {cases.map((item: any) => {
  //         return <p key={Math.random()}>{item.issue}</p>
  //       })}
  //     </section>
  //   )
  // } else {
  //   return <p>loading...</p>
  // }
}
