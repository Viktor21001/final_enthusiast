// import React, { useState } from 'react';
// import styles from './MessageBlock.module.css';

// export default function MessageBlock({ socket }) {
//   const [message, setMessage] = useState('');

//   const isTyping = () => {
//     // Это предполагает, что у вас есть пользователь, сохраненный в localStorage под ключом 'user'
//     const user = localStorage.getItem('user');
//     if (user) {
//       socket.emit('typing', `${user} is typing...`);
//     }
//   };

//   const handleSend = (e) => {
//     e.preventDefault();
//     // Предполагается, что userId сохранен в localStorage под ключом 'userId'
//     const userId = localStorage.getItem('userId');
//     if (message.trim() && userId) {
//       // Передаем userId вместо socket.id
//       socket.emit('message', {
//         text: message,
//         userId: userId,
//         name: localStorage.getItem('user') || 'Anonymous', // Если 'user' не установлен, используем 'Anonymous'
//         id: `${userId}-${Math.random()}`, // Используем userId вместо socket.id для идентификатора сообщения
//       });
//       setMessage('');
//     } else {
//       console.error('Message is empty or user is not defined');
//     }
//   };

//   return (
//     <div className={styles.messageBlock}>
//       <form className={styles.form} onSubmit={handleSend}>
//         <input
//           type="text"
//           placeholder="Напишите сообщение..."
//           className={styles.userMessage}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={isTyping}
//         />
//         <button className={styles.btn} type="submit">
//           Отправить
//         </button>
//       </form>
//     </div>
//   );
// }

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
