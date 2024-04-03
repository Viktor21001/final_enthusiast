import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { InputsType, fetchAddStartUp } from "../../redux/startUpActions";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function NewStartUp(): JSX.Element {
  const [inputs, setInputs] = useState<InputsType>({
    startUpTitle: "",
    startUpDescription: "",
    startUpCategory: "",
    progress: 0,
    currentAmount: 0,
    targetAmount: 0,
  });


  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const addStartUp = async (): Promise<void> => {
    void dispatch(fetchAddStartUp(inputs));
    setInputs({
      startUpTitle: "",
      startUpDescription: "",
      startUpCategory: "",
      progress: 0,
      currentAmount: 0,
      targetAmount: 0,
    });
    navigate('/');

  };

  return (
    <div>
      <form>
        <input
          onChange={changeHandler}
          type="text"
          name="startUpTitle"
          value={inputs.startUpTitle}
          placeholder="title"
        />
        <input
          onChange={changeHandler}
          type="text"
          name="startUpDescription"
          value={inputs.startUpDescription}
          placeholder="description"
        />
         <input
          onChange={changeHandler}
          type="number"
          name="progress"
          value={inputs.progress}
          placeholder="progress"
        />
         <input
          onChange={changeHandler}
          type="number"
          name="currentAmount"
          value={inputs.currentAmount}
          placeholder="current budget"
        />
           <input
          onChange={changeHandler}
          type="number"
          name="targetAmount"
          value={inputs.targetAmount}
          placeholder="target sum"
        />
        <select
          name="startUpCategory"
          onChange={changeHandler}
          value={inputs.startUpCategory}
          aria-placeholder="category"
        >
          <option value="">Select a category</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="art">Art</option>
        </select>
        <button onClick={addStartUp} type="button">
          Add
        </button>
      </form>
    </div>
  );
}
