import React, { ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../redux/hooks';
import { updateUserProfile } from '../../redux/userActions';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import styles from './ProfileForm.module.css';
import { useUser } from '../../UserContext';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { PeopleState } from '../../redux/peopleSlice';

export const UserProfileForm: React.FC = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    gender: false,
    birthDate: '',
    interests: '',
    activity: '', 
    avatar: null,
    isInvestor: false,
  });

  const dispatch = useAppDispatch();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/users/profile`, {
          withCredentials: true,
        });
        console.log(response, 'response');
        
        setProfile(response.data);
      } catch (error) {
        console.error('Ошибка получения данных:', error);
      }
    };

    fetchData();
  }, [setProfile])
  
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type, checked } = e.target;
    console.log(e.target.name, 'zzzzzzzzzzzzzz');
    
    if (type === 'checkbox') {
      setProfile((prev) => ({ ...prev, [name]: checked }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
    
    if (name === 'avatar') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  console.log(profile, 'zzzzzzzzzzzzzzzzzwwwwwwwwqewqeqeqewq');
  
  const avatarChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, avatar: event.target.files[0] }));
    const { name, files } = event.target;

    if (name === 'avatar') {
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
    console.log('здесь файл', profile.avatar);

    const data = new FormData();
    data.append('fullName', profile.fullName);
    data.append('birthDate', profile.birthDate);
    data.append('interests', profile.interests);
    data.append('activity', profile.activity);
    data.append('avatar', profile.avatar);
    console.log(data);

    dispatch(updateUserProfile(data));
    // navigate('/people');
  };

  return (
    <>
      <div className={styles.container}>
        <h1 style={{color: 'black'}} >Профиль</h1>
        <div className={styles.info}>
          {/* <h3>Логин: </h3>
          <h3>Почта: </h3> */}
          <h3>Имя {profile.fullName}</h3>
          <h3>Дата рождения: {profile.birthDate.slice(0, 10)}</h3>
          <h3>Интересы {profile.interests}</h3>
          <h3>Род деятельности {profile.activity}</h3>
        </div>
        <form onSubmit={handleSubmit}>
          {previewImage ? (
            <img
              style={{ width: '150px' }}
              src={previewImage}
              alt="Предпросмотр"
              className={styles.previewImage}
            />
          ) : null}
          <br />
          <p style={{color: 'black'}} >Добавьте или измените информацию о себе</p>
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
          <input
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
          <button type="submit" className={styles.addButton}>
            Сохранить
          </button>
        </form>
      </div>
    </>
  );
};

