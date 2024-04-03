import { createSlice } from '@reduxjs/toolkit';
import {
  fetchRegisterUser,
  fetchLoginUser,
  fetchLogoutUser,
} from './authActions';

interface AuthState {
  user: null | { [key: string]: any };
  loading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработка регистрации
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Обработка входа
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Обработка выхода
      .addCase(fetchLogoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
