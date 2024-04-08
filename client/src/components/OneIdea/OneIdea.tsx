import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchDeleteIdea, fetchIdeaById, fetchIdeas } from "../../redux/ideaActions";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import Page404 from "../page404/Page404";

export default function OneIdea(): React.JSX.Element {
  const { id } = useParams();
  const ideas = useAppSelector((store) => store.ideaSlice.ideas);
  console.log(ideas);

  const idea = ideas.find((el) => el.id === Number(id));
  // console.log(idea);

  const { login } = useUser();
  // console.log( login, idea["User.login"]);

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
          <h2>{idea?.title}</h2>
          <h3>{idea?.description}</h3>
          {login === idea["User.login"] ? (
            <button onClick={deleteHandler} type="button">
              delete
            </button>
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
