import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Activity } from "../../app/models/activity";
import agent from "../../app/api/agent";

interface ActivityState {
  activities: Activity[];
  groupedActivities: any[];
  selectedActivity: Activity | undefined;
  loading: boolean;
  initialLoading: boolean;
  errorMessage: string | undefined;
}

const initialState: ActivityState = {
  activities: [],
  groupedActivities: [],
  selectedActivity: undefined,
  loading: false,
  initialLoading: false,
  errorMessage: undefined,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    addActivity: (state, { payload: activity }) => {
      state.activities = [...state.activities, activity];
    },
    removeActivity: (state, { payload: id }) => {
      state.activities = state.activities.filter((item) => item.id !== id);
    },
    editActivity: (state, { payload }) => {
      state.activities = state.activities.map((item) => (item.id === payload.id ? { ...payload } : item));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listActivities.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(listActivities.fulfilled, (state, { payload }) => {
        state.initialLoading = false;
        state.activities = payload;
        state.groupedActivities = gronpActivity(payload);
      })
      .addCase(getActivity.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(getActivity.fulfilled, (state, { payload }) => {
        state.initialLoading = false;
        state.selectedActivity = payload;
      })
      .addCase(getActivity.rejected, (state, { error }) => {
        state.initialLoading = false;
        state.errorMessage = error.message;
      })
      .addCase(createActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(createActivity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateActivity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteActivity.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

const gronpActivity = (activities: Activity[]) => {
  const sortedActivities = Array.from(activities.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  const groupedActivities = Object.entries(
    sortedActivities.reduce((activities, activity) => {
      const date = activity.date.split("T")[0];
      activities[date] = activities[date] ? [...activities[date], activity] : [activity];
      return activities;
    }, {} as { [key: string]: Activity[] })
  );
  return groupedActivities;
};

export const listActivities = createAsyncThunk("activities/list", async () => {
  const res = await agent.Activities.list();
  return res;
});

export const getActivity = createAsyncThunk("activities/get", async (id: string) => {
  const res = await agent.Activities.details(id);
  return res;
});

export const createActivity = createAsyncThunk("activities/create", async (activity: Activity) => {
  const res = await agent.Activities.create(activity);
  return res;
});

export const updateActivity = createAsyncThunk("activities/update", async (activity: Activity) => {
  const res = await agent.Activities.update(activity);
  return res;
});

export const deleteActivity = createAsyncThunk("activities/delete", async (id: string) => {
  const res = await agent.Activities.delete(id);
  return res;
});

export const activityReducer = activitySlice.reducer;
export const { addActivity, removeActivity, editActivity } = activitySlice.actions;
