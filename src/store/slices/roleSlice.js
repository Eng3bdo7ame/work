import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl"; // Adjust the path as needed

// Define the initial state
const initialState = {
  roles: [],
  isLoading: false,
  error: null,
};

// Async thunk for fetching     roles
export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const response = await api.get("/Roles");
  return response.data.result; // Adjust based on your API response structure
});

// Create the slice
const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    // Add other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export the action creators
export const {} = roleSlice.actions;

// Export the reducer
export default roleSlice.reducer;
