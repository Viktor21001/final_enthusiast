import { AppThunk } from './store';
import { addMessage } from './chatSlice';

export const sendMessageThunk =
  (text: string, receiverId: number): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch('/api/v1/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, receiverId }),
        credentials: 'include', // Для поддержки кукис сессии
      });
      const message = await response.json();
      dispatch(addMessage(message)); // Добавляем сообщение в стор
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };
