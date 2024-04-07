import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import startUpSlice from './startUpSlice';
import ideaSlice from './ideaSlice';
import favoritesSlice from './favoritesSlice';
import memberSlice from './memberSlice';
import userReducer from './userSlice'; // Импорт userReducer
import peopleReducer from './peopleSlice'; // Импорт peopleReducer
import chatReducer from './chatSlice';

const store = configureStore({
  reducer: {
    startUpSlice,
    ideaSlice,
    favoritesSlice,
    memberSlice,
    user: userReducer,
    people: peopleReducer,
    chat: chatReducer,
  },
  // Вы можете добавить middleware здесь, если это необходимо
});

// Определение типа AppThunk для создания Thunk-функций
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
