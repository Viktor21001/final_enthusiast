import { ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';
import startUpSlice, { SliceState } from './startUpSlice';
import ideaSlice, { ideaSliceState } from './ideaSlice';
import favoritesSlice, { FavoritesSliceState } from './favoritesSlice';
import memberSlice, { MemberSliceState } from './memberSlice';
import userReducer, { UserState } from './userSlice'; // Импорт userReducer

// Добавляем тип состояния для userSlice
interface UserState {
  login: string | null;
  isAuthenticated: boolean;
  profile: {
    fullName: string;
    gender: boolean | null;
    birthDate: string | null;
    interests: string | null;
    activity: string | null;
    avatar: string | null;
  } | null;
}

// Обновляем StoreType, добавляя тип состояния для userSlice
type StoreType = {
  startUpSlice: SliceState;
  ideaSlice: ideaSliceState;
  favoritesSlice: FavoritesSliceState;
  memberSlice: MemberSliceState;
  user: UserState; // Добавляем тип состояния user
};

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    startUpSlice,
    ideaSlice,
    favoritesSlice,
    memberSlice,
    user: userReducer, // Добавляем userReducer в reducer
  },
};

export const store = configureStore(storeOptions);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
