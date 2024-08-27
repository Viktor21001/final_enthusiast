import { createSlice } from "@reduxjs/toolkit";
import { StartUpsType } from "./startUpActions";
import { fetchAddFavorites, fetchDeleteFavorites, fetchFavorites } from "./favoritesActions";

export type FavoritesSliceState = {
  favorites: StartUpsType;
  isLoading: boolean;
};

const initialState: FavoritesSliceState = {
  favorites: [],
  isLoading: true,
};

const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, { payload }) => {
      state.favorites = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAddFavorites.fulfilled, (state, { payload }) => {
        if (typeof payload === 'object') {
          state.favorites.push(payload);
        } else {
          state.favorites = state.favorites.filter((item) => item.id !== payload);
        }
      });
      builder.addCase(fetchDeleteFavorites.fulfilled, (state, { payload }) => {
        state.favorites = state.favorites.filter(
          (favorite) => favorite.id !== payload
        );
      });
  },
});

export default favoritesSlice.reducer;
