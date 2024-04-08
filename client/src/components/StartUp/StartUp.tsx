import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { fetchDeleteStartUp } from '../../redux/startUpActions';
import { fetchAddFavorites } from '../../redux/favoritesActions';
import { useUser } from '../../UserContext';
import { CgBookmark } from 'react-icons/cg';
import styles from './StartUp.module.css';

type StartUpComponentPropsType = {
  startUp: {
    id: number;
    'User.login': string;
    startUpTitle: string;
    startUpDescription: string;
    photos: string; // Полагаем, что фотографии хранятся в виде JSON строки
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
      <h3>Автор: {startUp['User.login']}</h3>
      <h2>{startUp.startUpTitle}</h2>
      <h3>{startUp.startUpDescription}</h3>
      <div>
      <img
              // src={idea?.photo}
              src={`${import.meta.env.VITE_IMG}/${startUp?.photos}`}
              alt="avatar"
              style={{ width: '150px' }}
          />
        {login && (
          <div className={styles.buttons}>
            <button type="button" onClick={() => navigate(`/${startUp.id}`)}>
              Read more
            </button>
            {login === startUp['User.login'] ? (
              <button onClick={deleteHandler} type="button">
                Delete
              </button>
            ) : (
              <button onClick={favoriteHandler} type="button">
                <CgBookmark
                  style={{ backgroundColor: 'white', fontSize: '2em' }}
                />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
