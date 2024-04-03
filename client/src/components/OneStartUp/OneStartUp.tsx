import React, { ChangeEvent, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAddMember, memberInputsType } from "../../redux/memberActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function OneStartUp(): React.JSX.Element {
  const { id } = useParams();
  const startUps = useAppSelector((store) => store.startUpSlice.startUps);

  const startup = startUps.find((el) => el.id === Number(id));
  
  const [memberInputs, setMemberInputs] = useState<memberInputsType>({
    login: "",
    role: "",
  });

  const dispatch = useAppDispatch();

  const memberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setMemberInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const addMember = async (): Promise<void> => {
    const idAsNumber = Number(id)

    dispatch(fetchAddMember({ inputs: memberInputs, id: idAsNumber }));
    console.log("Adding member:", memberInputs);
    setMemberInputs({
      login: "",
      role: "",
    });
  };

  return (
    <div>
      {startup ? (
        <>
          <h1>StartUp</h1>
          <h2>{startup?.startUpTitle}</h2>
          <h3>{startup?.startUpDescription}</h3>
          <h3>Add Team Member</h3>
      <input
        onChange={memberChangeHandler}
        type="text"
        name="login"
        value={memberInputs.login}
        placeholder="User login"
      />
      <input
        onChange={memberChangeHandler}
        type="text"
        name="role"
        value={memberInputs.role}
        placeholder="Role"
      />
      <button onClick={addMember} type="button">
        Add Member
      </button>
        </>
      ) : (
        <h1>Нет стартапа</h1>
      )}
    </div>
  );
}
