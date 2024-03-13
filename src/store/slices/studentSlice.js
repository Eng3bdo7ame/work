import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl"; // Adjust the path as needed

// Define the initial state
const initialState = {
  students: [],
  isLoading: false,
  error: null,
};

// Async thunk for fetching centers
export const fetchstudents = createAsyncThunk(
  "students/fetchstudents",
  async () => {
    const response = await api.get(
      "/Authentications/GetUsersByRoleName/Student"
    );
    console.log("response data from studentslice", response.data.result);
    return response.data.result; // Adjust based on your API response structure
  }
);

// Create the slice
const studentslice = createSlice({
  name: "students",
  initialState,
  reducers: {
    // Add other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchstudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchstudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchstudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export the action creators
export const {} = studentslice.actions;

// Export the reducer
export default studentslice.reducer;
