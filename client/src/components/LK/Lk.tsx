import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchDeleteFavorites,
  fetchFavorites,
} from '../../redux/favoritesActions';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import { UserProfileForm } from '../ProfileForm/ProfileForm';
import styles from './Lk.module.css';

export default function Lk(): JSX.Element {
  const favorites = useAppSelector((store) => store.favoritesSlice.favorites);

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const { login } = useUser();

  useEffect(() => {
    void dispatch(fetchFavorites());
  }, [dispatch]);

  const favorite = favorites.find((el) => el.id);
  const deleteHandler = async () => {
    if (favorite) {
      void dispatch(fetchDeleteFavorites(favorite.id));
    } else {
      console.error('Favorite not found');
    }
  };

  return (
    <div className={styles.container}>
      {login ? (
        <>
          <UserProfileForm />
          <div className={styles.favContainer}>
            <h3 className={styles.titlefav}>Избранные стартапы</h3>

            {favorites.length > 0 ? (
              <div className={styles.startUps}>
                {favorites.map((favorite) => (
                  <div className={styles.startUpContainer} key={favorite?.id}>
                    <div className={styles.photoDiv}>
                      <img
                        src={`${import.meta.env.VITE_IMG}/${
                          favorite.StartUp?.photos
                        }`}
                        alt="avatar"
                        className={styles.photo}
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.text}>
                        <h4 className={styles.title}>
                          {favorite.StartUp?.startUpTitle}
                        </h4>
                        <h4>{favorite.StartUp?.startUpDescription}</h4>
                      </div>
                      <div className={styles.buttons}>
                        <button onClick={deleteHandler}>
                          Удалить из избраного
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/${favorite?.startUpId}`)}
                        >
                          Подробнее{' '}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.titlefav}>
                Пока что Вы еще не добавили стартапы в избранное
              </p>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
