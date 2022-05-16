import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk(
  "GET/PROFILE",
  async (payload, { rejectWithValue }) => {
    let result = null;

    try {
      result = await axios.get("https://localhost:7799/profile", {
        params: {
          b_id: payload,
        },
      });
    } catch (err) {
      return rejectWithValue(err.response);
    }

    return result;
  }
);

export const getMyProfile = createAsyncThunk(
  "GET/MYPROFILE",
  async (payload, { rejectWithValue }) => {
    let result = null;

    try {
      result = await axios.get("https://localhost:7799/profile/myprofile");
    } catch (err) {
      return rejectWithValue(err.response);
    }

    return result;
  }
);

const myProfile = createSlice({
  name: "myProfile",
  initialState: {
    rt: null,
    rtmsg: null,
    item: [],
    m_item: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getProfile.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [getProfile.fulfilled]: (state, { payload }) => {
      return {
        rt: payload.status,
        rtmsg: payload.statusText,
        item: payload.data,
        loading: false,
      };
    },
    [getProfile.rejected]: (state, { payload }) => {
      return {
        ...state,
        rt: payload.status,
        rtmsg: payload.statusText,
        loading: false,
      };
    },
    [getMyProfile.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [getMyProfile.fulfilled]: (state, { payload }) => {
      return {
        rt: payload.status,
        rtmsg: payload.statusText,
        m_item: payload.data,
        loading: false,
      };
    },
    [getMyProfile.rejected]: (state, { payload }) => {
      return {
        ...state,
        rt: payload.status,
        rtmsg: payload.statusText,
        loading: false,
      };
    },
  },
});

export default myProfile.reducer;
