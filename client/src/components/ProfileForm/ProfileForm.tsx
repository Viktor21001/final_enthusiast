import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { updateUserProfile } from '../../redux/userActions';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { saveSaleBook } from '../../redux/multerAvatar';

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
  const navigate: NavigateFunction = useNavigate();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setProfile((prev) => ({ ...prev, [name]: checked }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
    console.log(e.target, 'zzzzzzzzzzzzzz');
     
    if (name === 'avatar') {
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
  }
  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
    // const { name, value, type, checked } = e.target;

    // if (type === 'checkbox') {
    //   setProfile((prev) => ({ ...prev, [name]: checked }));
    // } else {
    //   setProfile((prev) => ({ ...prev, [name]: value }));
    // }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('здесь файл',profile.avatar);
    
    const data = new FormData();
    data.append('fullName', profile.fullName)
    data.append('birthDate', profile.birthDate)
    data.append('interests', profile.interests)
    data.append('avatar', profile.avatar)
    console.log(data);

    dispatch(saveSaleBook(data));
    dispatch(updateUserProfile(profile));
    // navigate('/profile');
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // Отправляем данные формы через Redux
  // };

  return (
    <form onSubmit={handleSubmit}>
      {previewImage ? (
      <img style={{ width: '150px' }} src={previewImage} alt="Предпросмотр" className="previewImage" />
    ) : (
      null
    )}
      <input
        name="fullName"
        value={profile.fullName}
        onChange={handleChange}
        placeholder="Полное имя"
      />
      <select
        name="gender"
        value={String(profile.gender)}
        onChange={handleChange}
      >
        <option value="false">Мужской</option>
        <option value="true">Женский</option>
      </select>
      <input
        type="date"
        name="birthDate"
        value={profile.birthDate}
        onChange={handleChange}
      />
      <textarea
        name="interests"
        value={profile.interests}
        onChange={handleChange}
        placeholder="Интересы"
      />
      <input
        name="activity"
        value={profile.activity}
        onChange={handleChange}
        placeholder="Деятельность"
      />
       <input type="file" name="avatar" onChange={avatarChangeHandler} className='inputSalon'/>
      <label>
        Инвестор:
        <input
          name="isInvestor"
          type="checkbox"
          checked={profile.isInvestor}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Сохранить</button>
    </form>
  );
};
