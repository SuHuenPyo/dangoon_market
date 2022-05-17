import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBuyHistory = createAsyncThunk(
  "GET/BUYHISTORY",
  async (payload, { rejectWithValue }) => {
    let result = null;

    try {
      result = await axios.get(
        "https://dangoon.duckdns.org/api/requestpurchase/buyhistory"
      );
    } catch (err) {
      return rejectWithValue(err.response);
    }

    return result;
  }
);

const BuyHistorySlice = createSlice({
  name: "buyhistroy",
  initialState: {
    rt: null,
    rtmsg: null,
    item: null,
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getBuyHistory.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [getBuyHistory.fulfilled]: (state, { payload }) => {
      return {
        rt: payload.status,
        rtmsg: payload.statusText,
        item: payload.data,
        loading: false,
      };
    },
    [getBuyHistory.rejected]: (state, { payload }) => {
      return {
        ...state,
        rt: payload.status,
        rtmsg: payload.statusText,
        loading: false,
      };
    },
  },
});

export default BuyHistorySlice.reducer;
