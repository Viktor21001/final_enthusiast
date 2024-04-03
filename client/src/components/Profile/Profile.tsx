import React, { useState } from 'react';
import './Profile.css'; // Предполагается, что стили определены в этом CSS файле

const Profile = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState({
    interests: [],
    name: '',
    activity: '',
    gender: '',
    birthDate: '', // формат YYYY-MM-DD
  });

  const handleInterestChange = (interest) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      interests: prevProfile.interests.includes(interest)
        ? prevProfile.interests.filter((i) => i !== interest)
        : [...prevProfile.interests, interest],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Обработка отправки данных формы
    console.log(profile);
    // TODO: Отправка данных на сервер или в Redux store
    onClose(); // Закрытие модального окна после отправки формы
  };

  // Если модальное окно не открыто, ничего не отображать
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Расскажите нам немного больше</h2>
        <form onSubmit={handleSubmit}>
          <div className="interests">
            <label>
              Музыка{' '}
              <input
                type="checkbox"
                onChange={() => handleInterestChange('Музыка')}
              />
            </label>
            <label>
              Кино{' '}
              <input
                type="checkbox"
                onChange={() => handleInterestChange('Кино')}
              />
            </label>
            <label>
              Спорт{' '}
              <input
                type="checkbox"
                onChange={() => handleInterestChange('Спорт')}
              />
            </label>
            <label>
              Технологии{' '}
              <input
                type="checkbox"
                onChange={() => handleInterestChange('Технологии')}
              />
            </label>
            {/* Добавьте другие интересы по аналогии */}
          </div>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Введите ваше имя"
            required
          />

          <select
            name="activity"
            value={profile.activity}
            onChange={handleChange}
            required
          >
            <option value="">Выберите ваш род деятельности</option>
            {/* Добавьте опции для выбора рода деятельности */}
          </select>

          <label>
            Мужской{' '}
            <input
              type="radio"
              name="gender"
              value="Мужской"
              onChange={handleChange}
              checked={profile.gender === 'Мужской'}
            />
          </label>
          <label>
            Женский{' '}
            <input
              type="radio"
              name="gender"
              value="Женский"
              onChange={handleChange}
              checked={profile.gender === 'Женский'}
            />
          </label>

          <input
            type="date"
            name="birthDate"
            value={profile.birthDate}
            onChange={handleChange}
            required
          />

          <button type="submit">Продолжить</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
