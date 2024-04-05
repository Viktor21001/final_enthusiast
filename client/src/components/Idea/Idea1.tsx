import { JSX } from 'react/jsx-runtime';
import { useAppDispatch } from '../../redux/hooks';
import {
  Idea,
  fetchDeleteIdea,
  fetchDislikes,
  fetchLikes,
} from '../../redux/ideaActions';
import { FaThumbsUp, FaThumbsDown, FaEllipsisV } from 'react-icons/fa';
import styles from './Idea.module.css';
import { useUser } from '../../UserContext';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type StartUpComponentPropsType = {
  idea: Idea;
};

export default function Idea1({
  idea,
}: StartUpComponentPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate()

  const { login } = useUser();
  const likeHandler = () => {
    void dispatch(fetchLikes(idea.id));
  };

  const dislikeHandler = () => {
    void dispatch(fetchDislikes(idea.id));
  };

  // const deleteHandler = async () => {
  //   void dispatch(fetchDeleteIdea(idea.id));
  // };

  return (
    <div className={styles.ideaCard}>
      {login ? (
        <>
        <img
              // src={idea?.photo}
              src={`${import.meta.env.VITE_IMG}/${idea?.photo}`}
              alt="avatar"
              style={{ width: '150px' }}
          />
      <h3 className={styles.ideaTitle}>{idea?.title}</h3>
      <p className={styles.ideaDescription}>{idea?.description}</p>
      <div className={styles.cardFooter}>
        <button
          onClick={likeHandler}
          type="button"
          className={styles.iconButton}
        >
          <FaThumbsUp />
        </button>
        <button onClick={() => navigate(`/idea/${idea.id}`)} className={styles.iconButton}>
          <FaEllipsisV />
        </button>
        <button
          onClick={dislikeHandler}
          type="button"
          className={styles.iconButton}
        >
          <FaThumbsDown />
        </button>
      </div>
        </>
      ) : (
        <>
        </>
      )}
    </div>
  );
}
