import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogoutUser } from '../../redux/authActions';
import { RootState } from '../../redux/store';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth?.user);

  const handleLogout = () => {
    dispatch(fetchLogoutUser());
  };

  return user ? (
    <div>
      <h2>Профиль пользователя</h2>
      <p>Логин: {user.login}</p>
      <p>Email: {user.email}</p>
      <p>Роль: {user.isInvestor ? 'Инвестор' : 'Пользователь'}</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  ) : (
    // Элемент, отображаемый пока user не определён
    <div>Загрузка данных пользователя...</div>
  );
};

export default Profile;
