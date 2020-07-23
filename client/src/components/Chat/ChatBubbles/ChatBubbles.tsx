import React from 'react'

const ChatBubbles = (props: any) => {
  if (props.message.respondent === 'patient') {
    return (
      <div className="message__box message__box--user">
        <p className="message__message">{props.message.text}</p>
      </div>
    )
  } else {
    return (
      <div className="message__box message__box--pro">
        <p className="message__message">{props.message.text}</p>
      </div>
    )
  }
}

export default ChatBubbles;