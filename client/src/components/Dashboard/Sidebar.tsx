import React from 'react';
import moment from 'moment';

function DisplayButton(props: any) {
  if (props.buttonView === 'YourCases') {
    return <button>YOUR CASES</button>
  }
  if (props.buttonView === 'Unassigned') {
    return <button>UNASIGNED CASES</button>
  }
  if (props.buttonView === 'AllCases') {
    return <button>ALL CASES</button>
  }
  if (true) return <div></div>;
}

export default function Sidebar(props: any) {
  if (props.sidebar) {
    return (
      <section className="right__content">
        <h1>{props.sidebar._id}</h1>
        <p>{props.sidebar.issue}</p>
        <p>{props.sidebar.patientId}</p>
        <p>{moment(props.sidebar.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>

        <DisplayButton buttonView={props.buttonView} />
      </section>
    )
  } else {
    return <section className="right__content"><p>Please select a case</p></section>
  }
}
