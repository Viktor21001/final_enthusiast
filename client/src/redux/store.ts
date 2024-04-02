import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";
import startUpSlice, { SliceState } from "./startUpSlice";

type StoreType = {
    startUpSlice: SliceState;
};

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    startUpSlice,
  },
};

export const store = configureStore(storeOptions);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>