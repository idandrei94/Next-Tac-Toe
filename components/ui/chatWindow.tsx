import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppRootState } from 'redux-conf/store';
import MessageComponent from './messageComponent';
import styles from '@/styles/ChatWindow.module.css';
import { encryptMessage } from 'common/encryption';
import { sendMessage as sendMessageToApi } from 'client/api';

const ChatWindow = () => {
  const messages = useSelector((state: AppRootState) => state.room.messages);

  const [message, setMessage] = useState('');
  const { player, password } = useSelector((state: AppRootState) => state.room);

  const sendMessage = () => {
    sendMessageToApi(
      encryptMessage(
        JSON.stringify({
          sender: player,
          message: message
        }),
        password!
      )
    );
  };

  return (
    <div className={styles.chatContainer}>
      <div>
        {messages.map((m, i) => (
          <MessageComponent key={i} message={m.message} sender={m.sender} />
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            e.code === 'Enter' ? sendMessage() : undefined;
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
