import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchIdeas } from '../../redux/ideaActions';
import Idea1 from '../Idea/Idea1';

export default function Ideas() {
  const ideas = useAppSelector((state) => state.ideaSlice.ideas);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchIdeas());
  }, [dispatch]);

  return (
    <div>
      {ideas?.map((idea) => (
        <Idea1 key={idea.id} idea={idea} />
      ))}
    </div>
  );
}
