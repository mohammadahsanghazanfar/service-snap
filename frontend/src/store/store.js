import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from './index'; // Update with the actual path

const store = configureStore({
  reducer: {
    userData: sliceReducer,
  },
});

export default store;
