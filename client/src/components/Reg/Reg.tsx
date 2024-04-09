import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import "../Login/Login.css";

const Reg: React.FC = () => {
  const navigate = useNavigate();
  const { setRegLogin } = useUser();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
  });

  const handleFormClick = () => {
    setErrorMessage(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.login || !formData.password) {
      console.log("Пожалуйста, введите все данные");
      setErrorMessage("Пожалуйста, введите все данные");
      return;
    } else {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/v1/users/registration`,
          formData,
          {
            withCredentials: true,
          }
        );
        console.log(response);

        const { newUser } = response.data;
        const login = newUser.login;
        setRegLogin(login);

        console.log(response.data);

        navigate("/");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          console.error("Регистрация не удалась - Пользователь уже существует");
          setErrorMessage("Пользователь уже существует");
        } else {
          console.error("Регистрация не удалась", error);
        }
      }
    }
  };
  return (
    <>
      <div className="center">
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit} onClick={handleFormClick}>
          <div className="txt_field">
            <label>Логин</label>
            <input
              name="login"
              type="text"
              value={formData.login}
              onChange={handleChange}
              required
              placeholder="логин"
            />
            <span />
          </div>

          <div className="txt_field">
            <label>Почта</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="почта"
            />
            <span />
          </div>

          <div className="txt_field">
            <label>Пароль</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="пароль"
            />
            <span />
          </div>

          <input
            className="reglogButton"
            type="submit"
            value="Зарегистрироваться"
          />
          <div className="signup_link">
            Есть аккаунт? <Link to="/login">Войдите</Link>{" "}
          </div>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </>
  );
};

export default Reg;
