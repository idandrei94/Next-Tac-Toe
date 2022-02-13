import { Message } from '@/models/message';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppRootState } from 'redux-conf/store';

const getColor = (sender: string, player: string) => {
  if (sender === 'System') {
    return 'yellow';
  } else {
    return sender === player ? 'blue' : 'red';
  }
};

const MessageComponent: React.FC<Message> = ({ message, sender }) => {
  const player = useSelector((state: AppRootState) => state.room.player);

  const senderName = sender === 'System' ? sender : sender.substring(16);
  const cleanedMessage = sender === 'System' ? message.substring(16) : message;
  return (
    <p>
      <span style={{ color: getColor(sender, player!) }}>
        {senderName} {player === sender ? '(You)' : ''}
      </span>
      : {cleanedMessage}
    </p>
  );
};

export default MessageComponent;
