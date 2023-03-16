import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: undefined,
  error: undefined,
};

export const fetchBookingsByUserId = createAsyncThunk(
  "fetchBookingsByUserId",
  async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/my-bookings/${id}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const getBookingsByUserId = createSlice({
  name: "getBookingsByUserId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingsByUserId.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchBookingsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBookingsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getBookingsByUserId.reducer;
