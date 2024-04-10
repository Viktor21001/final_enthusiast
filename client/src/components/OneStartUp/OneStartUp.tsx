import React, { ChangeEvent, useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useParams } from 'react-router-dom';
import {
  Member,
  fetchAddMember,
  fetchMembers,
  memberInputsType,
} from '../../redux/memberActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchStartUpById,
  fetchAddFunding,
  fetchEditstartUp,
} from '../../redux/startUpActions';
import { useUser } from '../../UserContext';
import Page404 from '../page404/Page404';
import styles from './OneStartUp.module.css';

export default function OneStartUp(): React.JSX.Element {
  const { id } = useParams();
  const startUps = useAppSelector((store) => store.startUpSlice.startUps);
  const [progress, setProgress] = useState(0);

  console.log(startUps);

  const members = useAppSelector((state) => state.memberSlice.members);

  const startup = startUps.find((el) => el.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(startup?.startUpTitle || '');
  const [editedDescription, setEditedDescription] = useState(
    startup?.startUpDescription || ''
  );

  const { login } = useUser();

  const [memberInputs, setMemberInputs] = useState<memberInputsType>({
    login: '',
    role: '',
  });

  const [fundingAmount, setFundingAmount] = useState<string>('');

  const dispatch = useAppDispatch();

  const calculateProgress = (
    currentAmount: number,
    targetAmount: number
  ): number => {
    if (targetAmount === 0) return 0;
    const progress = (currentAmount / targetAmount) * 100;
    return parseFloat(Math.min(2000, progress).toFixed(2));
  };

  const handleFundingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFundingAmount(event.target.value);
  };

  const handleAddFunding = async () => {
    const amount = Number(fundingAmount);
    if (amount > 0) {
      await dispatch(fetchAddFunding({ amount: amount, id: Number(id) }));
      await dispatch(fetchStartUpById(Number(id)));
      setFundingAmount('');
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedDescription(event.target.value);
  };

  const saveChanges = async () => {
    await dispatch(
      fetchEditstartUp({
        id: startup.id,
        inputs: {
          startUpTitle: editedTitle,
          startUpDescription: editedDescription,
        },
      })
    );
    await dispatch(fetchStartUpById(Number(id))); // Обновление данных стартапа
    setIsEditing(false); // Выход из режима редактирования
  };

  useEffect(() => {
    const idAsNumber = Number(id);
    dispatch(fetchMembers(idAsNumber));
    if (id) {
      const idAsNumber = Number(id);
      dispatch(fetchStartUpById(idAsNumber));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const progress = calculateProgress(
      startup.currentAmount,
      startup.targetAmount
    );
    setProgress(progress);
  }, [startup.currentAmount, startup.targetAmount]);

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
    console.log('Adding member:', memberInputs);
    setMemberInputs({
      login: '',
      role: '',
    });
  };

  return (
    <div className={styles.container}>
      {startup ? (
        <>
          <h1 className={styles.title}>Стартап</h1>
          <img
            className={styles.image}
            src={`${import.meta.env.VITE_IMG}/${startup?.photos}`}
            alt="avatar"
          />
          {isEditing ? (
            <>
              <input
                className={styles.editInput}
                value={editedTitle}
                onChange={handleTitleChange}
              />
              <textarea
                className={styles.editTextarea}
                value={editedDescription}
                onChange={handleDescriptionChange}
              />
              <button className={styles.saveButton} onClick={saveChanges}>
                Сохранить
              </button>
              <button className={styles.cancelButton} onClick={toggleEdit}>
                Отмена
              </button>
            </>
          ) : (
            <>
              <h2 className={styles.title}>{startup?.startUpTitle}</h2>
              <h3 className={styles.description}>
                {startup?.startUpDescription}
              </h3>
              {login === startup['User.login'] && (
                <button className={styles.editButton} onClick={toggleEdit}>
                  Изменить
                </button>
              )}
            </>
          )}
          <div className={styles.progressContainer}>
            <div style={{ width: '100px', height: '100px' }}>
              <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                strokeWidth={10}
                styles={{
                  path: {
                    stroke: `#798aae`,
                    strokeWidth: 7,
                  },
                  trail: {
                    stroke: '#d6d6d6',
                    strokeWidth: 10,
                  },
                  text: {
                    fill: '#333',
                    dominantBaseline: 'middle',
                    textAnchor: 'middle',
                  },
                }}
              />
            </div>
            <div className={styles.fundingDetails}>
              <h3 className={styles.amount}>
                Текущая сумма: {startup.currentAmount}
              </h3>
              <h3 className={styles.amount}>
                Целевая сумма: {startup.targetAmount}
              </h3>
            </div>
          </div>
          <input
            onChange={handleFundingChange}
            className={styles.amountInput}
            type="number"
            name="amount"
            value={fundingAmount}
            placeholder="Введите сумму финансирования"
          />
          <button className={styles.addButton} onClick={handleAddFunding}>
            Отправить
          </button>
          <div className={styles.members1}>
            <h4 className={styles.header}>Команда</h4>
            <ul>
              {members.map((member: Member) => (
                <li key={member.id} className={styles.memberItem}>
                  <div className={styles.memberInfo}>
                    {member['User.login']} - {member.role}
                    <hr className={styles.hr} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {login === startup['User.login'] ? (
            <div className={styles.members}>
              <h4 className={styles.header}>Добавить в команду</h4>
              <input
                onChange={memberChangeHandler}
                className={styles.userInput}
                type="text"
                name="login"
                value={memberInputs.login}
                placeholder="Логин пользователя"
              />
              <input
                onChange={memberChangeHandler}
                className={styles.userInput}
                type="text"
                name="role"
                value={memberInputs.role}
                placeholder="Роль в команде"
              />
              <br />
              <button
                className={styles.addButton}
                onClick={addMember}
                type="button"
              >
                Добавить
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <Page404 />
      )}
    </div>
  );
}
