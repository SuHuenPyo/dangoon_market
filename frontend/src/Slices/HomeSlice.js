import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const getHomeList = createAsyncThunk(
  "GET/HOMELIST",
  async (payload, { rejectWithValue }) => {
    let result = null;

    try {
      result = await axios.get("https://13.209.89.208:7799/home", {
        params: {
          page: payload.page || 1,
          rows: payload.rows || 10,
        },
        withCredentials: true,
      });

    } catch (error) {
      return rejectWithValue(error.response);
    }

    return await result;
  }
);

const HomeSlice = createSlice({
  name: "home",
  initialState: {
    rt: null,
    rtmsg: null,
    item: null,
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getHomeList.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [getHomeList.fulfilled]: (state, { meta, payload }) => {
      if (meta.arg.page > 1) {
        payload.data.item = state.item.data.concat(payload.data.item);
      }

      return {
        ...state,
        rt: payload.status,
        rtmsg: payload.statusText,
        item: {
          data: payload.data.item,
          pageEnd: payload.data.pageEnd,
        },
        loading: false,
      };
    },
    [getHomeList.rejected]: (state, { error, payload }) => {
      return {
        ...state,
        rt: payload?.status || 500,
        rtmsg: payload?.statusText || error.message,
        loading: false,
      };
    },
  },
});

export default HomeSlice.reducer;
