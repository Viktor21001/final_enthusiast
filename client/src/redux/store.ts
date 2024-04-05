import { configureStore } from '@reduxjs/toolkit';
import startUpSlice, { SliceState } from './startUpSlice';
import ideaSlice, { ideaSliceState } from './ideaSlice';
import favoritesSlice, { FavoritesSliceState } from './favoritesSlice';
import memberSlice, { MemberSliceState } from './memberSlice';
import userReducer, { UserState } from './userSlice'; // Импорт userReducer
import peopleReducer, { PeopleState } from './peopleSlice'; // Импорт peopleReducer

// Интерфейс StoreType теперь включает people слайс.
// Этот тип обобщает структуру всего состояния Redux.
type StoreType = {
  startUpSlice: SliceState; // Предполагается, что SliceState уже определен в startUpSlice
  ideaSlice: ideaSliceState; // Предполагается, что ideaSliceState уже определен в ideaSlice
  favoritesSlice: FavoritesSliceState; // Предполагается, что FavoritesSliceState уже определен в favoritesSlice
  memberSlice: MemberSliceState; // Предполагается, что MemberSliceState уже определен в memberSlice
  user: UserState; // Предполагается, что UserState уже определен в userSlice
  // Добавляем состояние для people слайса.
  // Убедитесь, что PeopleState импортируется из файла peopleSlice, если он экспортируется из него
  people: PeopleState;
};

const store = configureStore({
  reducer: {
    startUpSlice, // Редьюсер для стартапов
    ideaSlice, // Редьюсер для идей
    favoritesSlice, // Редьюсер для избранного
    memberSlice, // Редьюсер для членов команды
    user: userReducer, // Редьюсер для пользователя
    people: peopleReducer, // Добавляем редьюсер для списка людей
  },
  // Применяем middleware, если нужно (не показано)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
