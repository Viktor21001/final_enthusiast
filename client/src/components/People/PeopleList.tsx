import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople, PeopleState } from '../../redux/peopleSlice';
import styles from './PeopleList.module.css';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const PeopleList: React.FC = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const peopleState = useSelector<RootState, PeopleState>(
    (state) => state.people
  );

  const handeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('user', user);
    socket.emit('newUser', { user, socketID: socket.id });
    navigate('/chats');
  };

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

  // Проверка на наличие данных и что это массив
  if (!Array.isArray(peopleState.people)) {
    // Здесь можно отобразить индикатор загрузки или сообщение об ошибке
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.peopleList}>
      <form className={styles.enterChat} onSubmit={handeSubmit}>
        <h2>Вход в чат</h2>
        <label htmlFor=""></label>
        <input
          type="text"
          id="user"
          placeholder="Ваше имя"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            socket.emit('join', user);
            navigate('/chats');
          }}
        >
          Войти
        </button>
      </form>
      {peopleState.people.map((person) => (
        <div key={person.id} className={styles.personCard}>
          <div className={styles.personImage}>
            <img
              src={person.avatar || 'default_avatar.png'}
              alt={person.fullName}
            />
          </div>
          <div className={styles.personDetails}>
            <h3>{person.fullName}</h3>
            <p>Интересы: {person.interests}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleList;
