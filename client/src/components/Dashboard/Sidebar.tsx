import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import moment from 'moment';
import './Dashboard.css';
import { useHistory } from 'react-router-dom';

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
  // eslint-disable-next-line react/destructuring-assignment
  if (props.buttonView === 'YourCases') {
    return (
      <button
        type="button"
        onClick={() => {
          props.setCurrentCase(props.id);
          history.push('/chat/psychologist');
        }}
      >
        Open case
      </button>
    );
  }
  // eslint-disable-next-line react/destructuring-assignment
  if (props.buttonView === 'Unassigned') {
    return (
      <button
        type="button"
        onClick={() => {
          assignCase(props.id, props.token);
        }}
      >
        Assign case
      </button>
    );
  }
  return <div />;
}

export default function Sidebar(props: any) {
  useEffect(() => {
    props.setSidebar(null);
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.buttonView]);
  // eslint-disable-next-line react/destructuring-assignment
  if (props.sidebar) {
    return (
      <section className="right__content">

        <h1>
          {
            props.sidebar._id // eslint-disable-line no-underscore-dangle
          }
        </h1>
        <p>
          {props.sidebar.issue}
        </p>
        <p>
          Patient:
          {props.sidebar.patientId}
        </p>
        <p>{moment(props.sidebar.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>

        <DisplayButton
          buttonView={props.buttonView}
          // eslint-disable-next-line no-underscore-dangle
          id={props.sidebar._id}
          token={props.token}
          setCurrentCase={props.setCurrentCase}
        />
      </section>
    );
  }
  return (
    <div />
  );
}
