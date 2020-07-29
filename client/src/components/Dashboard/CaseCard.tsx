import React from 'react'
import moment from 'moment';

export default function CaseCard(props: any) {
  return (
    <div onClick={() => { props.selectCase(props.item._id) }} className="content__card">
      <h2>Case: {props.item._id}</h2>
      <h3>{props.item.issue.slice(0, 140) + '...'}</h3>
      <p>{moment(props.item.createdAt).format('L')}</p>
      <div className={props.item.closed ? "closed__true" : "closed__false"}></div>
    </div>
  )
}
