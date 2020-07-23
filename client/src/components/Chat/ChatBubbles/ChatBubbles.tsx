import React from 'react'

interface Message {
  text: String;
  respondent: String;
  respondentId: String;
  respondentName: String;
  created: String;
}

type Props = {
  message: Message,
}




const ChatBubbles = ({ message }: Props) => {
  return (
    <div className="message__box--user">
      <p>{message.text}</p>
      <div className="message__img"></div>
    </div>
  )
}

export default ChatBubbles;