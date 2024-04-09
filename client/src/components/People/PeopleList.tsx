import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople, PeopleState } from "../../redux/peopleSlice";
import styles from "./PeopleList.module.css";
import { RootState } from "../../redux/store";
import { LuCornerUpRight } from "react-icons/lu";
import { LuCornerUpLeft } from "react-icons/lu";
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
  console.log(peopleState, 'peopleState');
  if (!Array.isArray(peopleState.people)) {
    // Здесь можно отобразить индикатор загрузки или сообщение об ошибке
    return <div>Loading...</div>;
  }
  console.log("------------------>", peopleState);
  return (
    <div className={styles.peopleList}>
      {peopleState.people.map((person) => (
        <div key={person.id} className={styles.personCard}>
          <div className={styles.personImage}>
            <img
              src={`${import.meta.env.VITE_IMG}/${person.avatar}`}
              alt={person.fullName}
            />
          </div>
          <div className={styles.personDetails}>
            <h3>{person.fullName}</h3>
            <p>Интересы: {person.interests}</p>
          </div>
          <div className={styles.cardFooter}>
        <button
          // onClick={}
          type="button"
              className={styles.dislikeButton} style={{borderRadius:'60%', backgroundColor:'rgb(178, 78, 78)'}}
        >
<LuCornerUpLeft style={{ fontSize: '2em' }}/>
        </button>
        <button
          // onClick={}
          type="button"
              className={styles.likeButton} style={{borderRadius:'60%', backgroundColor:'rgb(73, 148, 107)'}}
        >
<LuCornerUpRight style={{ fontSize: '2em' }} />
        </button>
      </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleList;
