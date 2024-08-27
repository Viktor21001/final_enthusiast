import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessageThunk } from '../../../../redux/chatActions';
import styles from './MessageBlock.module.css';

const MessageBlock = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const receiverId = 1; // Замените 1 на актуальный ID получателя из вашего состояния или контекста
    if (message.trim()) {
      dispatch(sendMessageThunk(message, receiverId));
      setMessage('');
    }
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
        />
        <button className={styles.btn} type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
};

export default MessageBlock;
