import React, { ChangeEvent, useState } from "react";
import { InputsType, fetchAddIdea } from "../../redux/ideaActions";
import { useAppDispatch } from "../../redux/hooks";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

export default function NewIdea(): JSX.Element {
  const [inputs, setInputs] = useState<InputsType>({
    title: "",
    description: "",
    category: "",
  });
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const { login } = useUser()

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const addIdea = async (): Promise<void> => {
    void dispatch(fetchAddIdea(inputs));
    setInputs({ title: "", description: "", category: "" });
    navigate('/ideas');
  };

  return (
    <div>
      {login ? (
        <>
      <form>
        <input
          onChange={changeHandler}
          type="text"
          name="title"
          value={inputs.title}
        />
        <input
          onChange={changeHandler}
          type="text"
          name="description"
          value={inputs.description}
        />
          <select name="category" onChange={changeHandler} value={inputs.category}>
          <option value="">Select a category</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="art">Art</option>
        </select>
        <button onClick={addIdea} type="button">
          Add
        </button>
      </form>
        </>
      ) : (
        <>
        </>
      )}
    </div>
  );
}