import { configureStore } from "@reduxjs/toolkit";
import { activityReducer } from "./slices/activitySlice";
import { errorReducer } from "./slices/ErrorSlice";

export const store = configureStore({
  reducer: {
    error: errorReducer,
    activity: activityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
