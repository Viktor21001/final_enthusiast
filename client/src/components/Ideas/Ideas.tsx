import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchIdeas } from '../../redux/ideaActions';
import Idea1 from '../Idea/Idea1';
import { useUser } from '../../UserContext';
import styles from "./ideas.module.css";


export default function Ideas() {
  const ideas = useAppSelector((state) => state.ideaSlice.ideas);
  const dispatch = useAppDispatch();

  const { login } = useUser();

  useEffect(() => {
    void dispatch(fetchIdeas());
  }, [dispatch]);

  console.log(ideas)
  return (
    <div>
      {login ? (
        <>
        <div className={styles.ideaContainer}>
        {ideas?.map((idea) => (
          <Idea1 key={idea.id} idea={idea} />
        ))}
        </div>
        </>
      ) : (
        <>
        </>
      )}
    </div>
  );
}
