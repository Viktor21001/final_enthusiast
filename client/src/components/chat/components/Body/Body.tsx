import React from 'react';
import styles from './Body.module.css';
import { useNavigate } from 'react-router-dom';

export default function Body({ messages, status }: any) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <header className={styles.header}>
        <button className={styles.btn} onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className={styles.container}>
        {messages.map((element: any) => {
          element.name === localStorage.getItem('user') ? (
            <div className={styles.chats} key={element.id}>
              <p className={styles.senderName}>Вы</p>
              <div className={styles.messageSender}>
                <p>{element.text}</p>
              </div>
            </div>
          ) : (
            <div className={styles.chats}>
              <p>{element.name}</p>
              <div className={styles.messageRecipient}>
                <p>{element.text}</p>
              </div>
            </div>
          );
        })}

        <div className={styles.status}>
          <p>{status}</p>
        </div>
      </div>
    </>
  );
}
