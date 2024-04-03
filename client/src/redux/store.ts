import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";
import startUpSlice, { SliceState } from "./startUpSlice";
import ideaSlice, { ideaSliceState } from "./ideaSlice";
import favoritesSlice,{ FavoritesSliceState } from "./favoritesSlice";

type StoreType = {
  startUpSlice: SliceState;
  ideaSlice: ideaSliceState
  favoritesSlice: FavoritesSliceState
};

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    startUpSlice,
    ideaSlice,
    favoritesSlice
  },
};

export const store = configureStore(storeOptions);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
