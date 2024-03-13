import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

// Define the initial state
const initialState = {
  centers: [],
  isLoading: false,
  error: null,
};

// Async thunk for fetching centers
export const fetchCenters = createAsyncThunk(
  "centers/fetchCenters",
  async () => {
    const response = await api.get("/Centers/GetAll");
    // console.log("response data from CentersSlice", response.data.result);
    return response.data.result; // Adjust based on your API response structure
  }
);

// Create the slice
const centerSlice = createSlice({
  name: "centers",
  initialState,
  reducers: {
    // Add other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCenters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCenters.fulfilled, (state, action) => {
        state.centers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCenters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export the action creators
export const {} = centerSlice.actions;

// Export the reducer
export default centerSlice.reducer;
