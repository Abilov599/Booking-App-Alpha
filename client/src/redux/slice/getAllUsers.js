import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: undefined,
  error: undefined,
};

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/allUsers");
    return res.data;
  } catch (error) {
    throw error;
  }
});

const getAllUsers = createSlice({
  name: "getAllUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getAllUsers.reducer;
