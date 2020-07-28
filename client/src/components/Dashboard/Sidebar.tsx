import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const assignCase = (caseId: any, token: string) => {
  fetch(`/api/cases/${caseId}/assign`, {
    method: 'PUT',
    headers: { 'x-auth-token': token },
  });
};

function DisplayButton(props: any) {
  const history = useHistory();

  if (props.buttonView === 'YourCases') {
    return <button>YOUR CASES</button>;
  }
  if (props.buttonView === 'Unassigned') {
    return (
      <button
        onClick={() => {
          assignCase(props.id, props.token);
          props.setCurrentCase(props.id);
          history.push('/chat/psychologist');
        }}
      >
        Assign case
      </button>
    );
  }
  if (props.buttonView === 'AllCases') {
    return <button>ALL CASES</button>;
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
      <section className="right__content">
        <p>Please select a case</p>
      </section>
    );
  }
}
