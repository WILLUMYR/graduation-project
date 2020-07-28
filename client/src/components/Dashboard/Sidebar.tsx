import React from 'react';
import moment from 'moment';

export default function Sidebar(props: any) {
  if (props.sidebar) {
    return (
      <section className="right__content">
        {console.log(props.sidebar)}
        <h1>{props.sidebar._id}</h1>
        <p>{props.sidebar.issue}</p>
        <p>{props.sidebar.patientId}</p>
        <p>{moment(props.sidebar.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>

        <button>Take on case</button>
      </section>
    )
  } else {
    return <section className="right__content"><p>Please select a case</p></section>
  }
}
