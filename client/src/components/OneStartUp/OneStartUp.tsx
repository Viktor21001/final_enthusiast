import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Member, fetchAddMember, fetchMembers, memberInputsType } from "../../redux/memberActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function OneStartUp(): React.JSX.Element {
  const { id } = useParams();
  const startUps = useAppSelector((store) => store.startUpSlice.startUps);
  const members = useAppSelector((state) => state.memberSlice.members);

  const startup = startUps.find((el) => el.id === Number(id));
  
  const [memberInputs, setMemberInputs] = useState<memberInputsType>({
    login: "",
    role: "",
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const idAsNumber = Number(id)
    dispatch(fetchMembers(idAsNumber));
  }, [dispatch]);

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
          <h4>Team Members</h4>
          <ul>
            {members.map((member: Member) => (
              <li key={member.id}>{member['User.login']} - {member.role}</li>
            ))}
          </ul>
          <h4>Add Team Member</h4>
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
