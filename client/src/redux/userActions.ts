import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../service/apiService';

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `${import.meta.env.VITE_URL}/users/updateProfile/`,
        profileData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const fetchUserProfile = createAsyncThunk(
//   'user/fetchUserProfile',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await apiService.get('/users/profile');
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );