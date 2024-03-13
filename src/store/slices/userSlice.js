import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl"; // Adjust the path as needed

// Define the initial state
const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

// Async thunk for fetching centers
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await api.get("/Authentications/GetAllUsers");
  console.log("response data from userSlice", response.data.result);
  return response.data.result; // Adjust based on your API response structure
});

// Create the slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Add other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export the action creators
export const {} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
