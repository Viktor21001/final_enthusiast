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

type StartUpComponentPropsType = {
  idea: Idea;
};

export default function Idea1({
  idea,
}: StartUpComponentPropsType): JSX.Element {
  const dispatch = useAppDispatch();

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
    <div className={styles.cardBody}>
      <h3 className={styles.ideaTitle}>{idea?.title}</h3>
      <p className={styles.ideaDescription}>{idea?.description}</p>
      <div className={styles.cardFooter}>
        <button onClick={likeHandler} type="button" className="icon-button">
          <FaThumbsUp />
        </button>
        <button onClick={deleteHandler} className="icon-button">
          <FaEllipsisV />
          {/* <button onClick={deleteHandler} type="button">
            delete
          </button> */}
        </button>
        <button onClick={dislikeHandler} type="button" className="icon-button">
          <FaThumbsDown />
        </button>
        <div className="dropdown"></div>
      </div>
    </div>
  );
}
