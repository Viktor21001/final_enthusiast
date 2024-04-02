import React, { useEffect } from "react";
import { JSX } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";


import { PacmanLoader } from 'react-spinners';
import { StartUp, fetchStartUps } from "../../redux/startUpActions";
import StartUp1 from "../StartUp/StartUp";

export default function StartUps(): JSX.Element {
  const startUps = useAppSelector((store) => store.startUpSlice.startUps);
  const isLoading = useAppSelector((state) => state.startUpSlice.isLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchStartUps());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <PacmanLoader/>}

      {!isLoading &&
        startUps.map((startUp: StartUp) => <StartUp1 key={startUp.id} startUp={startUp} />)}
    </div>
  );
}
