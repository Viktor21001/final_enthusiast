// authThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Типизация для входных данных формы регистрации
interface RegistrationData {
  login: string;
  email: string;
  password: string;
  isInvestor: boolean;
}

// Создаём асинхронный Thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
  'users/register',
  async (userData: RegistrationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5173/api/v1/',
        userData,
        { withCredentials: true }
      );

      return response.data; // В случае успеха возвращаем данные пользователя
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // В случае ошибки возвращаем содержимое ошибки для обработки в reducer
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);
