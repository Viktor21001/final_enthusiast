import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../service/apiService';

export interface UserProfile {
  id: number;
  fullName: string;
  gender: boolean;
  birthDate: string;
  interests: string;
  activity: string;
  avatar: string;
}

export interface PeopleState {
  people: UserProfile[];
}

const initialState: PeopleState = {
  people: [],
};

export const fetchPeople = createAsyncThunk('people/fetchAll', async () => {
  const response = await apiService.get(
    `${import.meta.env.VITE_URL}/users/people`
  );
  return response.data;
});

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.people = action.payload;
    });
  },
});

export default peopleSlice.reducer;
