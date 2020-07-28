import React from 'react'
import moment from 'moment';

export default function CaseCard(props: any) {
  return (
    <div onClick={() => { props.selectCase(props.item._id) }} className="content__card">
      <h2>Case identifier: {props.item._id}</h2>
      <h3>{props.item.issue}</h3>
      <p>{moment(props.item.createdAt).format('L')}</p>
      <p>Closed: {props.item.closed.toString()}</p>
    </div>
  )
}
