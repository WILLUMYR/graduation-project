import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import './Dashboard.css';

function DisplayButton(props: any) {
  const history = useHistory();

  const assignCase = (caseId: any, token: string) => {
    fetch(`/api/cases/${caseId}/assign`, {
      method: 'PUT',
      headers: { 'x-auth-token': token },
    }).then(() => {
      props.setCurrentCase(props.id);
      history.push('/chat/psychologist');
    });
  };

  if (props.buttonView === 'YourCases') {
    return <button onClick={() => {
      props.setCurrentCase(props.id);
      history.push('/chat/psychologist');
    }}>Open case</button>;
  }
  if (props.buttonView === 'Unassigned') {
    return (
      <button
        onClick={() => {
          assignCase(props.id, props.token);
        }}
      >
        Assign case
      </button>
    );
  }
  if (props.buttonView === 'AllCases') {
    return <div></div>;
  }
  if (true) return <div></div>;
}

export default function Sidebar(props: any) {

  useEffect(() => {
    props.setSidebar(null);
  }, [props.buttonView])

  if (props.sidebar) {
    return (
      <section className="right__content">
        <h1>{props.sidebar._id}</h1>
        <h2>{props.sidebar.issue}</h2>
        <p>Patient: {props.sidebar.patientId}</p>
        <p>{moment(props.sidebar.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>

        <DisplayButton
          buttonView={props.buttonView}
          id={props.sidebar._id}
          token={props.token}
          setCurrentCase={props.setCurrentCase}
        />
      </section>
    );
  } else {
    return (
      <div></div>
    );
  }
}
