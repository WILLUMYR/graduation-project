import React, { useEffect, useState } from 'react'
import CaseCard from './CaseCard'

export default function CaseList(props: any) {
  const [newCase, setNewCase] = useState();

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
        data.map((item: { createdAt: Date; _id: String; issue: React.ReactNode }) => {
          return <CaseCard selectCase={selectCase} key={Math.random()} item={item} />;
        });
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {

  }, [])

  return (
    <section>

    </section>
  )
}
