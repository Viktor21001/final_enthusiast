import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Body from './components/Body/Body';
import MessageBlock from './components/MessageBlock/MessageBlock';
import styles from './Chat.module.css';

export default function Chat({ socket }: any) {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    socket.on('response', (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.on('user data', (data) => {
      console.log('Мой ID:', data.id);
      // Здесь вы можете сохранить userId в состоянии компонента или где-то еще
    });
  }, [socket]);

  useEffect(() => {
    socket.on('responseTyping', (data) => {
      setStatus(data);
      setTimeout(() => setStatus(''), 1000);
    });
  }, [socket]);

  return (
    <div className={styles.chat}>
      <Sidebar socket={socket} />
      <main className={styles.main}>
        <Body messages={messages} status={status} />
        <MessageBlock socket={socket} />
      </main>
    </div>
  );
}

