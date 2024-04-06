import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople, PeopleState } from "../../redux/peopleSlice";
import styles from "./PeopleList.module.css";
import { RootState } from "../../redux/store";
import { LuCornerUpRight } from "react-icons/lu";
import { LuCornerUpLeft } from "react-icons/lu";

const PeopleList: React.FC = () => {
  const dispatch = useDispatch();
  const peopleState = useSelector<RootState, PeopleState>(
    (state) => state.people
  );

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

  // Проверка на наличие данных и что это массив
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
              src={person.avatar || "src/assets/avatar.png"}
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
              className={styles.dislikeButton} style={{borderRadius:'60%', backgroundColor:'rgb(199, 31, 31)'}}
        >
<LuCornerUpLeft style={{ fontSize: '2em' }}/>
        </button>
        <button
          // onClick={}
          type="button"
              className={styles.likeButton} style={{borderRadius:'60%', backgroundColor:'#2a9b1c'}}
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
