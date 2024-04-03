import { createSlice } from "@reduxjs/toolkit";
import { MembersType, fetchAddMember, fetchDeleteMember, fetchMembers } from "./memberActions";


export type MemberSliceState = {
  members: MembersType;
  funding?: number;
  isLoading: boolean;
};

const initialState: MemberSliceState = {
    members: [],
  funding: 0,
  isLoading: true,
};

const memberSlice = createSlice({
  name: "memberSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMembers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMembers.fulfilled, (state, { payload }) => {
      state.members = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAddMember.fulfilled, (state, { payload }) => {
      state.members.push(payload);
    });
    builder.addCase(fetchDeleteMember.fulfilled, (state, { payload }) => {
      state.members = state.members.filter(
        (member) => member.id !== payload
      );
    });
  },
});

export default memberSlice.reducer;
