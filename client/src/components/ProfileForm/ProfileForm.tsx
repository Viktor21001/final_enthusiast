import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { updateUserProfile } from "../../redux/userActions";
import { NavigateFunction, useNavigate } from "react-router-dom";
import styles from "./ProfileForm.module.css";
import { useUser } from "../../UserContext";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { PeopleState } from "../../redux/peopleSlice";

export const UserProfileForm: React.FC = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    gender: false,
    birthDate: "",
    interests: "",
    activity: "",
    avatar: null,
    isInvestor: false,
  });

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  // const { login } = useUser();
  // const peopleState = useSelector<RootState, PeopleState>(
  //   (state) => state.people
  // );
  // const member = peopleState.people.find((el) => el.login === login);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setProfile((prev) => ({ ...prev, [name]: checked }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
    console.log(e.target, "zzzzzzzzzzzzzz");

    if (name === "avatar") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const avatarChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, avatar: event.target.files[0] }));
    const { name, files } = event.target;

    if (name === "avatar") {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("здесь файл", profile.avatar);

    const data = new FormData();
    data.append("fullName", profile.fullName);
    data.append("birthDate", profile.birthDate);
    data.append("interests", profile.interests);
    data.append("avatar", profile.avatar);
    console.log(data);

    dispatch(updateUserProfile(data));
    // navigate('/people');
  };

  return (
    <>
      <div className={styles.info}>
        <h3>Логин: </h3>
        <h3>Почта: </h3>
        <h3>Имя {profile.fullName}</h3>
        <h3>Имя {profile.birthDate}</h3>
        <h3>Интересы {profile.interests}</h3>
        <h3>Род деятельности {profile.activity}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        {previewImage ? (
          <img
            style={{ width: "150px" }}
            src={previewImage}
            alt="Предпросмотр"
            className={styles.previewImage}
          />
        ) : null}
        <br />
        <p>Добавьте или измените информацию о себе</p>
        <input
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
          placeholder="Полное имя"
          className={styles.inputField}
        />
        <select
          name="gender"
          value={String(profile.gender)}
          onChange={handleChange}
          className={styles.selectField}
        >
          <option value="false">Мужской</option>
          <option value="true">Женский</option>
        </select>
        <input
          type="date"
          name="birthDate"
          value={profile.birthDate}
          onChange={handleChange}
          className={styles.inputField}
        />
        <textarea
          name="interests"
          value={profile.interests}
          onChange={handleChange}
          placeholder="Интересы"
          className={styles.textAreaField}
        />
        <input
          name="activity"
          value={profile.activity}
          onChange={handleChange}
          placeholder="Деятельность"
          className={styles.inputField}
        />
        <br />
        <input
          type="file"
          name="avatar"
          onChange={avatarChangeHandler}
          className="inputSalon"
        />
        {/* <label className={styles.checkboxLabel}>
        Инвестор:
        <input
          name="isInvestor"
          type="checkbox"
          checked={profile.isInvestor}
          onChange={handleChange}
          className={styles.checkboxField}

        />
      </label> */}
        <button type="submit" className={styles.addButton}>
          Сохранить
        </button>
      </form>
    </>
  );
};
