import React from 'react';
import moment from 'moment';

interface Props {
  selectCase: (arg0: string) => void
  item: {
    _id: string;
    issue: string;
    createdAt: number;
    closed: boolean
  }
}

export default function CaseCard(props: Props) {
  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line no-underscore-dangle, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={() => { props.selectCase(props.item._id); }} className="content__card">
      <h2>
        Case identifier:
        { // eslint-disable-next-line no-underscore-dangle, react/destructuring-assignment
          props.item._id
        }
      </h2>
      <h3>
        {
          // eslint-disable-next-line react/destructuring-assignment
          props.item.issue
        }
      </h3>
      <p>
        {
          // eslint-disable-next-line react/destructuring-assignment
          moment(props.item.createdAt).format('L')
        }
      </p>
      <p>
        Closed:
        {
          // eslint-disable-next-line react/destructuring-assignment
          props.item.closed.toString()
        }
      </p>
    </div>
  );
}
