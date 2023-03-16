import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: undefined,
  error: undefined,
};

export const fetchCardDataById = createAsyncThunk(
  "fetchCardDataById",
  async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/rooms/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const getCardDataById = createSlice({
  name: "getCardDataById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardDataById.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchCardDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCardDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getCardDataById.reducer;
