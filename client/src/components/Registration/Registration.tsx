import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRegisterUser } from '../../redux/authActions';

const Registration = () => {
  const [formData, setFormData] = useState({
    login: '',
    email: '',
    password: '',
    isInvestor: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchRegisterUser(formData))
      .unwrap()
      .then(() => navigate('/login'))
      .catch((error) => console.error('Registration Error:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="login"
        value={formData.login}
        onChange={handleChange}
        placeholder="Login"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <label>
        Is Investor:
        <input
          type="checkbox"
          name="isInvestor"
          checked={formData.isInvestor}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;
