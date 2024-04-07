import React from 'react';
import styles from './MessageBlock.module.css';

export default function MessageBlock({ socket }: any) {
  const [message, setMessage] = React.useState('');

  const isTyping = () => {socket.emit('typing', `${localStorage.getItem('user')} is typing...`)}

  const handleSend = (e) => {
    e.preventDefault();
    console.log({ user: localStorage.getItem('user') || 'user', message });
    if (message.trim() && localStorage.getItem('user')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('user') || 'user1',
        id: `${socket.id}-${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  return (
    <div className={styles.messageBlock}>
      <form className={styles.form} onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Напишите сообщение..."
          className={styles.userMessage}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={isTyping}
        />
        <button className={styles.btn} type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
}
