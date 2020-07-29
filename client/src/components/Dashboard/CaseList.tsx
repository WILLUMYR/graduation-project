import React from 'react';
import CaseCard from './CaseCard';

interface Props {
  selectCase: () => void;
  cases: Array<{}>;
}

const CaseList: React.FC<Props> = (props: Props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.cases.length > 0) {
    return (
      <>
        { // eslint-disable-next-line max-len
          props.cases.map((item: any) => <CaseCard selectCase={props.selectCase} key={Math.random()} item={item} />)
        }
      </>
    );
  }
  return (
    <div>
      <p>Loading cases...</p>
    </div>
  );
};

export default CaseList;
