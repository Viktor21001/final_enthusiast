import React, { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { StartUp, fetchStartUps } from '../../redux/startUpActions';
import StartUp1 from '../StartUp/StartUp';
import { useUser } from '../../UserContext';

export default function StartUps(): JSX.Element {
  const startUps = useAppSelector((store) => store.startUpSlice.startUps);
  const { login } = useUser();

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchStartUps());
  }, [dispatch]);

  return (
    <div>
      {startUps?.map((startUp: StartUp) => (
        <StartUp1 key={startUp.id} startUp={startUp} />
      ))}
    </div>
  );
}
