import { createSlice } from "@reduxjs/toolkit";
import { IdeasType, fetchAddIdea, fetchDeleteIdea, fetchDislikes, fetchEditIdea, fetchIdeas, fetchLikes } from "./ideaActions";


export type ideaSliceState = {
  ideas: IdeasType;
  likes: number;
  dislikes: number;
  isLoading: boolean;
};

const initialState: ideaSliceState = {
ideas: [],
  likes: 0,
  dislikes: 0,
  isLoading: true,
};

const ideaSlice = createSlice({
  name: "ideaSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIdeas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchIdeas.fulfilled, (state, { payload }) => {
      state.ideas = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAddIdea.fulfilled, (state, { payload }) => {
      state.ideas.push(payload);
    });
    builder.addCase(fetchDeleteIdea.fulfilled, (state, { payload }) => {
      state.ideas = state.ideas.filter(
        (idea) => idea.id !== payload
      );
    });
    builder.addCase(fetchEditIdea.fulfilled, (state, { payload }) => {
      state.ideas = state.ideas.map((el) => {
        if (el.id === payload.id) {
          return payload;
        } else {
          return el;
        }
      });
    });
    builder.addCase(fetchLikes.fulfilled, (state, { payload }) => {
      state.likes = payload;
    });
    builder.addCase(fetchDislikes.fulfilled, (state, { payload }) => {
        state.dislikes = payload;
      });
  },
});

export default ideaSlice.reducer;
