import React, { useState, useEffect } from 'react'

export default function Dashboard(props: any) {
  const [cases, setCases] = useState();

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

  if (cases !== undefined) {
    return (
      <section>
        {cases.map((item: any) => {
          return <p key={Math.random()}>{item.issue}</p>
        })}
      </section>
    )
  } else {
    return <p>loading...</p>
  }
}
