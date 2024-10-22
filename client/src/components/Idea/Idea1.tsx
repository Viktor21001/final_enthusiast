import { JSX } from 'react/jsx-runtime';
import { useAppDispatch } from '../../redux/hooks';
import {
  Idea,
  fetchDislikes,
  fetchLikes,
} from '../../redux/ideaActions';
import { FaThumbsUp, FaThumbsDown, FaEllipsisV } from 'react-icons/fa';
import styles from './Idea.module.css';
import { useUser } from '../../UserContext';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

type StartUpComponentPropsType = {
  idea: Idea;
};

export default function Idea1({
  idea,
}: StartUpComponentPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const { login } = useUser();
  const [likeDislike, setLikeDislike] = useState(idea?.Votes?.at(0)?.type);

  const [buttonColor, setButtonColor] = useState('');

  useEffect(() => {
    if (likeDislike === 'like') {
      setButtonColor('green');
    } else if (likeDislike === 'dislike') {
      setButtonColor('red');
    } else {
      setButtonColor('');
    }
  }, [likeDislike]);

  const navigate: NavigateFunction = useNavigate();

  const likeHandler = () => {
    void dispatch(fetchLikes(idea.id));
    setLikeDislike(likeDislike !== 'like' ? 'like' : ''); // Если уже поставлен лайк, снимаем его, иначе ставим
  };

  const dislikeHandler = () => {
    void dispatch(fetchDislikes(idea.id));
    setLikeDislike(likeDislike !== 'dislike' ? 'dislike' : ''); // Аналогично для дизлайка
  };

  return (
    <div className={styles.ideaCard}>
      {login ? (
        <>
          <h3> Автор: {idea?.User?.login}</h3>
          <img
            src={`${import.meta.env.VITE_IMG}/${idea?.photo}`}
            alt="avatar"
            className={styles.photo}
          />
          <h3 className={styles.ideaTitle}>{idea?.title}</h3>
          <p className={styles.ideaDescription}>
            {' '}
            Описание:{' '}
            {idea.description.length > 32
              ? `${idea.description.slice(0, 32)}...`
              : idea.description}
          </p>
          <div className={styles.cardFooter}>
            <button
              onClick={() => {
                likeHandler();
              }}
              type="button"
              style={{
                color: buttonColor === 'green' ? 'rgb(73, 148, 107)' : 'grey',
                backgroundColor: 'transparent',
                fontSize: '45px',
              }}
            >
              <FaThumbsUp />
            </button>
            <button
              onClick={() => navigate(`/idea/${idea.id}`)}
              className={styles.iconButton}
              style={{ color: 'grey', backgroundColor: 'transparent' }}
            >
              <FaEllipsisV />
            </button>
            <button
              onClick={dislikeHandler}
              type="button"
              style={{
                color: buttonColor === 'red' ? 'rgb(178, 78, 78)' : 'grey',
                backgroundColor: 'transparent',
                fontSize: '45px',
              }}
            >
              <FaThumbsDown />
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
