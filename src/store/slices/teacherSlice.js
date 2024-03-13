import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl"; // Adjust the path as needed

// Define the initial state
const initialState = {
  teachers: [],
  isLoading: false,
  error: null,
};

// Async thunk for fetching centers
export const fetchteachers = createAsyncThunk(
  "teachers/fetchteachers",
  async () => {
    const response = await api.get(
      "/Authentications/GetUsersByRoleName/Teacher"
    );
    // console.log("response data from teacherslice", response.data.result);
    return response.data.result; // Adjust based on your API response structure
  }
);

// Create the slice
const teacherslice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    // Add other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchteachers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchteachers.fulfilled, (state, action) => {
        state.teachers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchteachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export the action creators
export const {} = teacherslice.actions;

// Export the reducer
export default teacherslice.reducer;
