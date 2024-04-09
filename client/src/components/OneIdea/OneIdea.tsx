import React, {  useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchDeleteIdea, fetchIdeaById } from "../../redux/ideaActions";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import Page404 from "../page404/Page404";

export default function OneIdea(): React.JSX.Element {
  const { id } = useParams();
  const ideas = useAppSelector((store) => store.ideaSlice.ideas);
  console.log(ideas);

  const idea = ideas.find((el) => el.id === Number(id));

  const { login } = useUser();


  const navigate: NavigateFunction = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchIdeaById(Number(id)));
    }
  }, [id, dispatch]);

  const deleteHandler = async () => {
    if (id) {
      const idAsNumber = Number(id);
      void dispatch(fetchDeleteIdea(idAsNumber));
      navigate(`/`);
    }
  };

  console.log(`params id:${id} | idea id:${idea?.id}`);

  return (
    <div>
      {idea ? (
        <>
          <h2>Название: {idea?.title}</h2>
          <h3>Описание: {idea?.description}</h3>
          {/* <img>{idea.photo}</img> */}
          {login === idea["User.login"] ? (
            <>
            <h3>Лайки: {idea.likes}</h3>
            <h3>Дизлайки: {idea.dislikes}</h3>
            <button onClick={deleteHandler} type="button">
              Удалить
            </button>
            </>
          ) : null}
        </>
      ) : (
        <h1>
          {" "}
          <Page404 />
        </h1>
      )}
    </div>
  );
}
