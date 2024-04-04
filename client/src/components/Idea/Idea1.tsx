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

type StartUpComponentPropsType = {
  idea: Idea;
};

export default function Idea1({
  idea,
}: StartUpComponentPropsType): JSX.Element {
  const dispatch = useAppDispatch();

  const { login } = useUser();
  const likeHandler = () => {
    void dispatch(fetchLikes(idea.id));
  };

  const dislikeHandler = () => {
    void dispatch(fetchDislikes(idea.id));
  };

  const deleteHandler = async () => {
    void dispatch(fetchDeleteIdea(idea.id));
  };

  return (
    <div className={styles.ideaCard}>
      {login ? (
        <>
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
        <button onClick={deleteHandler} className={styles.iconButton}>
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
