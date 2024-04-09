import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { setRegLogin } = useUser();

  const [formData, setFormData] = useState({
    login: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/users/login`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      const { user } = response.data;
      const login = user.login;

      setRegLogin(login);
      navigate('/');
    } catch (error) {
      console.error('Краказябра', error);
    }
  };

  return (
    <>
      <div className="center">
        <h1>Авторизация</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              name="login"
              type="text"
              value={formData.login}
              onChange={handleChange}
              required
            />
            <label>Логин</label>
            <span />
          </div>

          <div className="txt_field">
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Пароль</label>
            <span />
          </div>

          <input type="submit" value="Войти" className="reglogButton" />

          <div className="signup_link">
            Еще не зарегистрированы?{' '}
            <a href="/registration">Зарегистрироваться</a>
          </div>
        </form>
      </div>
    </>
  );
}
