import React from 'react';
import CaseCard from './CaseCard'

const CaseList = (props: any) => {
  if (props.cases) {
    return (
      <>
        {
          props.cases.map((item: any) => {
            return <CaseCard selectCase={props.selectCase} key={Math.random()} item={item} />
          })
        }
      </>
    )
  } else {
    return <div><p>Loading cases...</p></div>;
  }
}

export default CaseList