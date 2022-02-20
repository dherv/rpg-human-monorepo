import { configureStore } from '@reduxjs/toolkit';
import activitiesReducer from '../features/activities/slice';
import { apiSlice } from '../features/api/apiSlice';

// ...

export const store = configureStore({
  reducer: {
    activities: activitiesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
