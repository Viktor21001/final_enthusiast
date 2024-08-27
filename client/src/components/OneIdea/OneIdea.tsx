import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchDeleteIdea, fetchIdeaById } from '../../redux/ideaActions';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import Page404 from '../page404/Page404';
import styles from './OneIdea.module.css';

export default function OneIdea(): React.JSX.Element {
  const { id } = useParams();
  const ideas = useAppSelector((store) => store.ideaSlice.ideas);
  console.log(ideas);

  const idea = ideas.find((el) => el.id === Number(id));

  const { login } = useUser();

  const navigate: NavigateFunction = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchIdeaById(Number(id)));
    }
  }, [id, dispatch]);

  const deleteHandler = async () => {
    if (id) {
      const idAsNumber = Number(id);
      await dispatch(fetchDeleteIdea(idAsNumber));
      navigate(`/ideas`);
    }
  };

  console.log(`params id:${id} | idea id:${idea?.id}`);

  return (
    <div className={styles.container}>
      {idea ? (
        <div className={styles.ideaInfo}>
          <div className={styles.photo}>
            <img
              className={styles.img}
              src={`${import.meta.env.VITE_IMG}/${idea?.photo}`}
            />
          </div>
          <h2 className={styles.title}>Название: {idea?.title}</h2>
          <h3 className={styles.description}>Описание: {idea?.description}</h3>
          {login === idea['User.login'] ? (
            <div>
              <h3 className={styles.likesDislikes}>Лайки: {idea.likes}</h3>
              <h3 className={styles.likesDislikes}>
                Дизлайки: {idea.dislikes}
              </h3>
              <button
                onClick={deleteHandler}
                className={styles.deleteButton}
                type="button"
              >
                Удалить
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <h1>
          {' '}
          <Page404 />
        </h1>
      )}
    </div>
  );
}
