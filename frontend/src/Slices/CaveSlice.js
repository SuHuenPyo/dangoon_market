import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCaveList = createAsyncThunk(
  "GET/CAVELIST",
  async (payload, { rejectWithValue }) => {
    let result = null;

    try {
      result = await axios.get("https://dangoon.duckdns.org/api/cavelife", {
        params: {page: payload.page, rows: 5 }
      });
    } catch (err) {
      result = rejectWithValue(err.response);
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
        item: payload.data.item.reverse(),
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
