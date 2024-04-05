import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { updateUserProfile } from '../../redux/userActions';

export const UserProfileForm: React.FC = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    gender: false,
    birthDate: '',
    interests: '',
    activity: '',
    avatar: '',
    isInvestor: false,
  });

  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setProfile((prev) => ({ ...prev, [name]: checked }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Отправляем данные формы через Redux
    dispatch(updateUserProfile(profile));
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <input
        name="avatar"
        value={profile.avatar}
        onChange={handleChange}
        placeholder="Ссылка на аватар"
      />
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
