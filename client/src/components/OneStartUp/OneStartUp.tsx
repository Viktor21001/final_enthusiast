import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Member,
  fetchAddMember,
  fetchMembers,
  memberInputsType,
} from "../../redux/memberActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchStartUpById, fetchAddFunding } from "../../redux/startUpActions";
import { useUser } from "../../UserContext";
import Page404 from "../page404/Page404";

export default function OneStartUp(): React.JSX.Element {
  const { id } = useParams();
  const startUps = useAppSelector((store) => store.startUpSlice.startUps);

  console.log(startUps);

  const members = useAppSelector((state) => state.memberSlice.members);

  const startup = startUps.find((el) => el.id === Number(id));
  const { login } = useUser();

  // console.log(startup);
  
  // console.log( login, startup["User.login"]);

  const [memberInputs, setMemberInputs] = useState<memberInputsType>({
    login: "",
    role: "",
  });

  const [fundingAmount, setFundingAmount] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleFundingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFundingAmount(event.target.value);
  };

  const handleAddFunding = async () => {
    const amount = Number(fundingAmount); 
    if (amount > 0) {
      await dispatch(
        fetchAddFunding({ amount: amount, id: Number(id) })
      );
      await dispatch(fetchStartUpById(Number(id)));
      setFundingAmount(''); 
    }
  };

  useEffect(() => {
    const idAsNumber = Number(id);
    dispatch(fetchMembers(idAsNumber));
    if (id) {
      const idAsNumber = Number(id);
      dispatch(fetchStartUpById(idAsNumber));
    }
  }, [dispatch, id]);

  const memberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setMemberInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const addMember = async (): Promise<void> => {
    const idAsNumber = Number(id);

    await dispatch(fetchAddMember({ inputs: memberInputs, id: idAsNumber }));
    dispatch(fetchMembers(idAsNumber));
    console.log("Adding member:", memberInputs);
    setMemberInputs({
      login: "",
      role: "",
    });
  };
  // console.log(members);

  return (
    <div>
      {startup ? (
        <>
          <h1>StartUp</h1>
          <h2>{startup?.startUpTitle}</h2>
          <h3>{startup?.startUpDescription}</h3>
          <h2>Startup progress: {startup.progress} %</h2>
          <h3>Current amount: {startup.currentAmount}</h3>
          <h3>Target amount: {startup.targetAmount}</h3>
          <input
            onChange={handleFundingChange}
            type="number"
            name="amount"
            value={fundingAmount}
            placeholder="Enter funding amount"
          />
          <button onClick={handleAddFunding}>Add Funding</button>
          <h4>Team Members</h4>
          <ul>
            {members.map((member: Member) => (
              <li key={member.id}>
                {member["User.login"]} - {member.role}
              </li>
            ))}
          </ul>
          {login === startup["User.login"] ? (
            <>
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
          ):null}
        </>
      ) : (
        <Page404/>
      )}
    </div>
  );
}
