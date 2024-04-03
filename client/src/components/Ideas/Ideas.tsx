import React, { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Idea, fetchIdeas } from '../../redux/ideaActions';
import Idea1 from '../Idea/Idea';

export default function Ideas(): JSX.Element {
  const startUps = useAppSelector((store) => store.ideaSlice.ideas);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchIdeas());
  }, [dispatch]);

  return (
    <div>
      {startUps.map((idea: Idea) => (
        <Idea1 key={idea.id} idea={idea} />
      ))}
    </div>
  );
}
