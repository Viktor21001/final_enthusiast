import React, { ChangeEvent, useEffect, useState } from "react";
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
import styles from "./OneStartUp.module.css";

export default function OneStartUp(): React.JSX.Element {
  const { id } = useParams();
  const startUps = useAppSelector((store) => store.startUpSlice.startUps);

  console.log(startUps);

  const members = useAppSelector((state) => state.memberSlice.members);

  const startup = startUps.find((el) => el.id === Number(id));
  const { login } = useUser();



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


  return (
    <div className={styles.container}>
      {startup ? (
        <>
          <h1 className={styles.title}>StartUp</h1>
          <img
              className={styles.image}
              src={`${import.meta.env.VITE_IMG}/${startup?.photos}`}
              alt="avatar"
          />
          <h2 className={styles.title}>{startup?.startUpTitle}</h2>
          <h3 className={styles.description}>{startup?.startUpDescription}</h3>
          <h2 className={styles.progress}>Startup progress: {startup.progress} %</h2>
          <h3 className={styles.amount} >Current amount: {startup.currentAmount}</h3>
          <h3 className={styles.amount} >Target amount: {startup.targetAmount}</h3>
          <input
            onChange={handleFundingChange}
            className={styles.amountInput}
            type="number"
            name="amount"
            value={fundingAmount}
            placeholder="Enter funding amount"
          />
          <button className={styles.addButton} onClick={handleAddFunding}>Add Funding</button>
          <div className={styles.members1}>
            <h4 className={styles.header} >Team Members</h4>
            <ul>
              {members.map((member: Member) => (
                <li key={member.id} className={styles.memberItem}>
                  <div className={styles.memberInfo}>
                    {member["User.login"]} - {member.role}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {login === startup["User.login"] ? (
            <div className={styles.members}>
              <h4 className={styles.header} >Add Team Member</h4>
              <input
                onChange={memberChangeHandler}
                className={styles.amountInput}
                type="text"
                name="login"
                value={memberInputs.login}
                placeholder="User login"
              />
              <input
                onChange={memberChangeHandler}
                className={styles.amountInput}
                type="text"
                name="role"
                value={memberInputs.role}
                placeholder="Role"
              />
              <button
                className={styles.addButton}
                onClick={addMember}
                type="button"
              >
                Add Member
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <Page404/>
      )}
    </div>
  );
}
