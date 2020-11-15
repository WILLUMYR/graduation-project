import React from 'react';
import moment from 'moment';

interface Props {
  selectCase: (arg0: string) => void;
  item: {
    _id: string;
    issue: string;
    createdAt: number;
    closed: boolean;
  };
}

export default function CaseCard({ item, selectCase }: Props) {
  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={() => {
        selectCase(item._id);
      }}
      className="content__card"
    >
      <h2>
        Case identifier:
        {item._id}
      </h2>
      <h3>{`${item.issue.slice(0, 140)}...`}</h3>
      <p>{moment(item.createdAt).format('L')}</p>
      <div className={item.closed ? 'closed__true' : 'closed__false'} />
    </div>
  );
}
