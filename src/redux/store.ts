import { configureStore } from "@reduxjs/toolkit";
import { activityReducer } from "./slices/activitySlice";
import { userReducer } from "./slices/userSlice";
import { commonReducer } from "./slices/commonSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    activity: activityReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
