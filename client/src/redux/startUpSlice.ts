import { createSlice } from "@reduxjs/toolkit";
import {
  StartUpsType,
  fetchAddFunding,
  fetchAddStartUp,
  fetchDeleteStartUp,
  fetchEditstartUp,
  fetchStartUps,
} from "./startUpActions";

export type SliceState = {
  startUps: StartUpsType;
  funding?:number;
  isLoading: boolean;
};

const initialState: SliceState = {
  startUps: [],
  funding: 0,
  isLoading: true,
};

const startUpSlice = createSlice({
  name: "startUpSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStartUps.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStartUps.fulfilled, (state, { payload }) => {
      state.startUps = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAddStartUp.fulfilled, (state, { payload }) => {
      state.startUps.push(payload);
    });
    builder.addCase(fetchDeleteStartUp.fulfilled, (state, { payload }) => {
      state.startUps = state.startUps.filter((startUp) => startUp.id !== payload);
    });
    builder.addCase(fetchEditstartUp.fulfilled, (state, { payload }) => {
      state.startUps = state.startUps.map((el) => {
        if (el.id === payload.id) {
          return payload;
        } else {
          return el;
        }
      });
    });
    builder.addCase(fetchAddFunding.fulfilled, (state, { payload }) => {
          state.funding = payload;
      });
  },
});

export default startUpSlice.reducer;
