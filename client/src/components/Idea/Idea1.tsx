import { JSX } from "react/jsx-runtime";
import { useAppDispatch } from "../../redux/hooks";
import {
  Idea,
  fetchDeleteIdea,
  fetchDislikes,
  fetchIdeas,
  fetchLikes,
} from "../../redux/ideaActions";
import { FaThumbsUp, FaThumbsDown, FaEllipsisV } from "react-icons/fa";
import styles from "./Idea.module.css";
import { useUser } from "../../UserContext";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


type StartUpComponentPropsType = {
  idea: Idea;
};

export default function Idea1({
  idea,
}: StartUpComponentPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const { login } = useUser();
  const [likeDislike, setLikeDislike] = useState(idea?.Votes[0]?.type) 
  console.log(likeDislike)

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

  // const likeHandler = () => {
  //     void dispatch(fetchLikes(idea.id));  
  // };

  // const dislikeHandler = () => {
  //     void dispatch(fetchDislikes(idea.id));
  // };

 // const [isLiked, setIsLiked] = useState(false);
  // const [isDisliked, setIsDisliked] = useState(false);

  // const likeHandler = () => {
  //   if (!isLiked) {
  //     void dispatch(fetchLikes(idea.id));
  //     dispatch(fetchIdeas)
  //     setIsLiked(true);
  //     setIsDisliked(false); 
  //   } else {
  //     setIsLiked(false);
  //   }
  // };

  // const dislikeHandler = () => {
  //   if (!isDisliked) {
  //     void dispatch(fetchDislikes(idea.id));
  //     dispatch(fetchIdeas)
  //     setIsDisliked(true);
  //     setIsLiked(false); 
  //   } else {
  //     setIsDisliked(false);
  //   }
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
  onClick={() => {
    likeHandler();
  }}
  type="button"
  style={{ backgroundColor: buttonColor === 'green' ? 'green' : 'inherit', color: 'white' }}
>
          <FaThumbsUp />
        </button>
        <button onClick={() => navigate(`/idea/${idea.id}`)} className={styles.iconButton}>
          <FaEllipsisV />
        </button>
        <button
          onClick={dislikeHandler}
          type="button"
          style={{ backgroundColor: buttonColor === 'red' ? 'red' : 'inherit', color: 'white' }}
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
