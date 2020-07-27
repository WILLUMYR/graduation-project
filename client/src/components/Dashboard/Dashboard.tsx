import React, { useState, useEffect } from 'react'
import './Dashboard.css';
import moment from 'moment';
import Sidebar from './Sidebar';

export default function Dashboard(props: any) {
  const [cases, setCases] = useState();
  const [view, setView] = useState('YourCases');
  const [sidebar, setSidebar] = useState();

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


  const selectCase = (id: String) => {
    const newCase = cases.filter((item: { _id: String; }) => item._id === id);
    setSidebar(newCase[0])
  }

  const switchCase = (view: String) => {
    switch (view) {
      case 'YourCases':
        return (
          <p>Your cases</p>
        )
      case 'Unassigned':
        const unassigned = cases.filter((item: any) => !item.psychologistsId)
        return (
          <>
            {unassigned.map((item: { createdAt: Date; _id: String; issue: React.ReactNode; }) => {
              return (
                <div onClick={() => { selectCase(item._id) }} className="content__card" key={Math.random()}>
                  <h2>Case identifier: {item._id}</h2>
                  <h3>{item.issue}</h3>
                  <p>{moment(item.createdAt).format('L')}</p>
                </div>
              )
            })}
          </>
        )
      case 'AllCases':
        return (
          <>
            {cases.map((item: { createdAt: Date; _id: String; issue: React.ReactNode; }) => {
              return (
                <div onClick={() => { selectCase(item._id) }} className="content__card" key={Math.random()}>
                  <h2>Case identifier: {item._id}</h2>
                  <h3>{item.issue}</h3>
                  <p>{moment(item.createdAt).format('L')}</p>
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
      <div className="dashboard__nav">
        <button className="dashboard__button" onClick={() => { setView('YourCases') }}>Your Cases</button>
        <button className="dashboard__button" onClick={() => { setView('Unassigned') }}>Unassigned Cases</button>
        <button className="dashboard__button" onClick={() => { setView('AllCases') }}>All Cases</button>
      </div>
      <section className="dash__content">
        <div className="left__content">
          {switchCase(view)}
        </div>
        <Sidebar sidebar={sidebar} />
      </section>
    </>
  )
}
