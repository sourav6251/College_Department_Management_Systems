
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import dashboardReducer from './dashboardSlice';
import userReducer from './userStateSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    dashboard: dashboardReducer,
    user:userReducer
  },
});
