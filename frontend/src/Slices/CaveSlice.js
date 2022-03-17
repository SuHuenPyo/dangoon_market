import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCaveList = createAsyncThunk(
  "GET/CAVELIST",
  async (payload, { rejectedWithValue }) => {
    let result = null;

    try {
      result = axios.get("http://dg-market.iptime.org:28019/cavelife", {
        params: {page: payload.page, rows: 5 }
      });
    } catch (err) {
      result = rejectedWithValue(err.response);
    }

    return result;
  }
);

const CaveSlice = createSlice({
  name: "cave",
  initialState: {
    rt: null,
    rtmsg: null,
    item: null,
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getCaveList.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [getCaveList.fulfilled]: (state, { meta, payload }) => {
      if (meta.arg.page > 1) {
        payload.data.item = state.item.item.concat(payload.data.item);
      }

      return {
        ...state,
        rt: payload.status,
        rtmsg: payload.statusText,
        item: payload.data,
        loading: false,
      };
    },
    [getCaveList.rejected]: (state, { error, payload }) => {
      return {
        ...state,
        rt: payload?.status || error.name,
        rtmsg: payload?.statusText || error.message,
        loading: false,
      };
    },
  },
});

export default CaveSlice.reducer;
