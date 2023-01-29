import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import diamondsSlice from '../features/diamonds/diamondsSlice';

export const store = configureStore({
  reducer: {
    diamonds:diamondsSlice,

  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
