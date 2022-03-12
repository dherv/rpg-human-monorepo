import { createSlice } from '@reduxjs/toolkit';

// TODO: remove selected
const initialState = { selected: null };
const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    selectActivity(state, action) {
      state.selected = action.payload;
    },
  },
});

export const { selectActivity } = activitiesSlice.actions;

export default activitiesSlice.reducer;
