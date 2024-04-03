import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { useAppDispatch } from '../../redux/hooks';
import {
  StartUp,
  fetchDeleteStartUp,
  fetchEditstartUp,
} from '../../redux/startUpActions';
import { fetchAddFavorites } from '../../redux/favoritesActions';

type StartUpComponentPropsType = {
  startUp: StartUp;
};

export default function StartUp1({
  startUp,
}: StartUpComponentPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  //   const [btnEdit, setBtnEdit] = useState(false);
  //   const [edit, setEdit] = useState({ title: startUp.startUpTitle, description: startUp.startUpDescription, category: startUp.startUpCategory, progress: startUp.progress, currentAmount: startUp.currentAmount, targetAmount: startUp.targetAmount, members: startUp.members });

  //   const buttonEdit = () => {
  //     setBtnEdit(!btnEdit);
  //   };
  //   const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //     setEdit((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  //   };

  //   const editHandler = async (): Promise<void> => {
  //     try {

  //       void dispatch(fetchEditstartUp({ inputs: edit, id: startUp.id }));
  //       setBtnEdit(!btnEdit);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  // КНопка для добавления в избранное и одновременного удаления из избранного
  const favoriteHandler = () => {
    void dispatch(fetchAddFavorites(startUp.id));
  };

  const deleteHandler = async () => {
    void dispatch(fetchDeleteStartUp(startUp.id));
  };

  return (
    <div className="startUp">
      <h3>{startUp.startUpTitle}</h3>
      <h2>{startUp.startUpDescription}</h2>
      <h2>{startUp.funding}</h2>
      <div>
        <button onClick={deleteHandler} type="button">
          delete
        </button>
        <button onClick={favoriteHandler} type="button">
          Favorites
        </button>
      </div>
    </div>
  );
}
