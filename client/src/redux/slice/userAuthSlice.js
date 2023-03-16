import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: undefined,
  error: undefined,
};

export const fetchUserAuth = createAsyncThunk("fetchUserAuth", async (obj) => {
  try {
    if (obj) {
      return null;
    } else {
      const res = await axios.get("http://localhost:8080/api/user", {
        withCredentials: true,
      });
      return res.data;
    }
  } catch (error) {
    throw error;
  }
});

const userAuthSlice = createSlice({
  name: "userAuthSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAuth.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchUserAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userAuthSlice.reducer;
