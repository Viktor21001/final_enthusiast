import { JSX } from "react/jsx-runtime";
import { useAppDispatch } from "../../redux/hooks";
import { Idea, fetchDeleteIdea, fetchDislikes, fetchLikes } from "../../redux/ideaActions";

type StartUpComponentPropsType = {
    idea: Idea ;
};

export default function  Idea1({ idea }: StartUpComponentPropsType): JSX.Element {
  const dispatch = useAppDispatch();

  const likeHandler = () => {
    void dispatch(fetchLikes(idea.id))
  };

  const dislikeHandler = () => {
    void dispatch(fetchDislikes(idea.id))
  };

  const deleteHandler = async () => {
    void dispatch(fetchDeleteIdea(idea.id));
  };

  return (
    <div className="startUp">
    <h3>{idea.title}</h3>
    <h2>{idea.description}</h2>
    <div>
      <button onClick={deleteHandler} type="button">
        delete
      </button>
      <button onClick={likeHandler} type="button">
        like
      </button>
      <button onClick={dislikeHandler} type="button">
        dislike
      </button>
    </div>
  </div>
    )
}
