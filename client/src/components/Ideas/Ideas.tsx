import React, { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Idea, fetchIdeas } from '../../redux/ideaActions';
import Idea1 from '../Idea/Idea1';

export default function Ideas(): JSX.Element {
  const ideas = useAppSelector((store) => store.ideaSlice.ideas);

  // console.log(ideas);
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchIdeas());
  }, [dispatch]);

  return (
    <div>
      {ideas?.map((idea: Idea) => (
        <Idea1 key={idea.id} idea={idea} />
      ))}
    </div>
  );
}
