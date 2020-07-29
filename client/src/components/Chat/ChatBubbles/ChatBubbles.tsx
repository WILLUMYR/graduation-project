import React from 'react';

interface Props {
  message: {
    respondent: string;
    text: string;
  }
}

const ChatBubbles: React.FC<Props> = (props: Props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { respondent, text } = props.message;

  if (respondent === 'patient') {
    return (
      <div className="message__box message__box--user">
        <p className="message__message message--user">{text}</p>
      </div>
    );
  }

  return (
    <div className="message__box message__box--pro">
      <p className="message__message message--pro">{text}</p>
    </div>
  );
};

export default ChatBubbles;
