import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchDeleteFavorites, fetchFavorites } from "../../redux/favoritesActions";
import { StartUp } from "../../redux/startUpActions";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Lk(): JSX.Element {
  const favorites = useAppSelector((store) => store.favoritesSlice.favorites);
console.log(favorites)
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    void dispatch(fetchFavorites());
  }, [dispatch]);

  const favorite = favorites.find(el => el.id);
  const deleteHandler = async () => {
    if (favorite) {
      void dispatch(fetchDeleteFavorites(favorite.id));
    } else {
      console.error('Favorite not found');
    }
  };

  return (
    <div>
      <h4>Fvorites</h4>
      {favorites?.map((favorite) => (
        <div key={favorite.id}>
          <h2>{favorite.StartUp.startUpTitle}</h2>
          <h2>{favorite.StartUp.startUpDescription}</h2>
          <button onClick={deleteHandler}>delete from favorite</button>
          <button type="button" onClick={() => navigate(`/${favorite.startUpId}`)}>Read more</button>

          {/* <p>{favorite.StartUp.startUpDescription}</p> */}
        </div>
      ))}
    </div>
  );
}
