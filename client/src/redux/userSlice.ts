import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../service/apiService';

// Определение типа для состояния
export interface UserState {
  login: string | null;
  isAuthenticated: boolean;
  profile: {
    fullName: string;
    gender: boolean;
    birthDate: string;
    interests: string;
    activity: string;
    avatar: string;
  } | null;
}

const initialState: UserState = {
  login: null,
  isAuthenticated: false,
  profile: null,
};

// Async thunk для обновления профиля пользователя
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: any, { rejectWithValue }) => {
    try {
      // Предполагаем, что есть эндпоинт на сервере для обновления профиля
      const response = await apiService.post(
        '/api/v1/users/profile',
        profileData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Создание userSlice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Редьюсер для установки данных пользователя при успешной аутентификации
    setUser: (state, action) => {
      state.login = action.payload.login;
      state.isAuthenticated = true;
      state.profile = action.payload.profile;
    },
    // Редьюсер для очистки данных пользователя при выходе
    clearUser: (state) => {
      state.login = null;
      state.isAuthenticated = false;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      // Обновление данных профиля пользователя при успешном выполнении
      state.profile = action.payload;
    });
    // Дополнительные обработчики для других состояний (pending, rejected) могут быть добавлены здесь
  },
});

// export const fetchUserProfile = createAsyncThunk(
//   'user/fetchUserProfile',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const response = await apiService.get('/api/v1/users/profile');
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// Экспорт действий и редьюсера
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
