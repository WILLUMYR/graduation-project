import React, { useState, useEffect } from 'react'

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
          <p>All Cases</p>
        )
    }
  }

  return (
    <>
      <div>
        <button className="dashboard__button" onClick={() => { setView('YourCases') }}>Your Cases</button>
        <button className="dashboard__button" onClick={() => { setView('Unassigned') }}>Unassigned Cases</button>
        <button className="dashboard__button" onClick={() => { setView('AllCases') }}>All Cases</button>
      </div>
      <section>
        {switchCase(view)}
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
