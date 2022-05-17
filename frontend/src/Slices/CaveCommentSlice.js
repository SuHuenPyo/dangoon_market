import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCaveComment = createAsyncThunk(
  "GET/CAVECOMMENT",
  async (payload, { rejectWithValue }) => {
    let result = null;
    try {
      result = await axios.get("https://dangoon.duckdns.org/api/cavelife/comment", {
        params: {
          boardId: payload,
        },
      });
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return await rejectWithValue(err.response);
    }

    return await result;
  }
);

export const postCaveComment = createAsyncThunk(
  "POST/CAVECOMMENT",
  async (payload, { rejectWithValue }) => {
    let result = null;
    try {
      result = await axios.post(
        "https://dangoon.duckdns.org/api/cavelife/comment",
        payload
      );
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return await rejectWithValue(err.response);
    }

    return await result;
  }
);

const CaveCommentSlice = createSlice({
  name: "cavecomment",
  initialState: {
    c_rt: null,
    c_rtmsg: null,
    c_item: [],
    c_loading: false,
  },
  reducers: {},
  extraReducers: {
    // getCaveDetails
    [getCaveComment.pending]: (state, action) => {
      return {
        ...state,
        c_loading: true,
      };
    },
    [getCaveComment.fulfilled]: (state, { meta, payload }) => {
      const item = payload.data.result.reverse();
      return {
        ...state,
        c_rt: payload.status,
        c_rtmsg: payload.statusText,
        c_item: item,
        c_loading: false,
      };
    },
    [getCaveComment.rejected]: (state, { error, payload }) => {
      return {
        ...state,
        c_rt: payload?.status || error.name,
        c_rtmsg: payload?.statusText || error.message,
        c_loading: false,
      };
    },
    //post
    [postCaveComment.pending]: (state, action) => {
        return {
          ...state,
          c_loading: true,
        };
      },
      [postCaveComment.fulfilled]: (state, { meta, payload }) => {
        return {
          ...state,
          c_rt: payload.status,
          c_rtmsg: payload.statusText,
          c_loading: false,
        };
      },
      [postCaveComment.rejected]: (state, { error, payload }) => {
        return {
          ...state,
          c_rt: payload?.status || error.name,
          c_rtmsg: payload?.statusText || error.message,
          c_loading: false,
        };
      },
  },
});

export default CaveCommentSlice.reducer;
