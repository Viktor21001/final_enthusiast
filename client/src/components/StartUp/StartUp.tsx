import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { fetchDeleteStartUp } from "../../redux/startUpActions";
import { fetchAddFavorites } from "../../redux/favoritesActions";
import { useUser } from "../../UserContext";
import { CgBookmark } from "react-icons/cg";
import styles from "./StartUp.module.css";

type StartUpComponentPropsType = {
  startUp: {
    id: number;
    "User.login": string;
    startUpTitle: string;
    startUpDescription: string;
    photos: string;
  };
};

export default function StartUpComponent({
  startUp,
}: StartUpComponentPropsType) {
  const dispatch = useAppDispatch();
  const { login } = useUser();
  const navigate = useNavigate();

  const deleteHandler = () => {
    dispatch(fetchDeleteStartUp(startUp.id));
  };

  const favoriteHandler = () => {
    dispatch(fetchAddFavorites(startUp.id));
  };

  return (
    <div className={styles.startUpContainer}>
      <div  className={styles.photoDiv}
>
        <img
          src={`${import.meta.env.VITE_IMG}/${startUp?.photos}`}
          alt="avatar"
          className={styles.photo}
        />
      </div>
      <div  className={styles.info}>
        <div className={styles.text}>
        <h4 className={styles.title}>Название: {startUp.startUpTitle}</h4>
        <h4>Автор: {startUp["User.login"]}</h4>
        <h4>Описание: {startUp.startUpDescription.length > 50 ? `${startUp.startUpDescription.slice(0, 50)}...` : startUp.startUpDescription}</h4>
        </div>
        {login && (
          <div className={styles.buttons}>
            <button style={{color: "black"}} type="button" onClick={() => navigate(`/${startUp.id}`)}>
              Подробнее
            </button>
            {login === startUp["User.login"] ? (
              <button style={{color: "black"}} onClick={deleteHandler} type="button">
                Удалить
              </button>
            ) : (
              <button style={{color: "black"}} onClick={favoriteHandler} type="button">
                <CgBookmark
                  style={{ backgroundColor: "white", fontSize: "2em" }}
                />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
