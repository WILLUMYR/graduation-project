import React from 'react';

export default function CaseList : React.FC (props: any) {
  if(props.cases) {
   return {props.cases.map((item: { createdAt: Date; _id: String; issue: React.ReactNode }) => {
      return <CaseCard selectCase={selectCase} key={Math.random()} item={item} />;
    })}
  } else {
    return <div><p>Loading cases...</p></div>;
  }
}
