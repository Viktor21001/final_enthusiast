import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";
import startUpSlice, { SliceState } from "./startUpSlice";
import ideaSlice, { ideaSliceState } from "./ideaSlice";

type StoreType = {
  startUpSlice: SliceState;
  ideaSlice: ideaSliceState
};

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    startUpSlice,
    ideaSlice,
  },
};

export const store = configureStore(storeOptions);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
