import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: undefined,
  error: undefined,
};

export const fetchCardData = createAsyncThunk("fetchCardData", async (obj) => {
  try {
    if (obj) {
      return obj;
    } else {
      const res = await axios.get("http://localhost:8080/api/rooms");
      return res.data;
    }
    return res.data;
  } catch (error) {
    throw error;
  }
});

const getCardData = createSlice({
  name: "getCardData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardData.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchCardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getCardData.reducer;
