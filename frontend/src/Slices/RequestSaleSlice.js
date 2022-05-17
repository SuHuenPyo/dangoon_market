import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postRequest = createAsyncThunk(
  "POST/REQUEST",
  async (payload, { rejectWithValue }) => {
    let result = null;

    try {
      result = await axios.post("https://13.209.89.208:7799/requestpurchase", {
        b_id: payload,
      });
    } catch (err) {
      return rejectWithValue(err.response);
    }

    return result;
  }
);

export const getRequest = createAsyncThunk(
  "GET/REQUEST",
  async (payload, { rejectWithValue }) => {
    let result = null;

    try {
      result = await axios.get("https://13.209.89.208:7799/requestpurchase/sellhistory");
    } catch (err) {
      return rejectWithValue(err.response);
    }

    return result;
  }
);  

const requestSale = createSlice({
  name: "requestSale",
  initialState: {
    r_rt: null,
    r_rtmsg: null,
    r_item: null,
    r_loading: false,
  },
  reducers: {},
  extraReducers: {
    [postRequest.pending]: (state, action) => {
      return {
        ...state,
        r_loading: true,
      };
    },
    [postRequest.fulfilled]: (state, { payload }) => {
      return {
        r_rt: payload.status,
        r_rtmsg: payload.statusText,
        r_loading: false,
      };
    },
    [postRequest.rejected]: (state, { payload }) => {
      return {
        ...state,
        r_rt: payload.status,
        r_rtmsg: payload.statusText,
        r_loading: false,
      };
    },
    [getRequest.pending]: (state, action) => {
        return {
          ...state,
          r_loading: true,
        };
      },
      [getRequest.fulfilled]: (state, { payload }) => {
        
        return {
          r_rt: payload.status,
          r_rtmsg: payload.statusText,
          r_item:   payload.data,
          r_loading: false,
        };
      },
      [getRequest.rejected]: (state, { payload }) => {
        return {
          ...state,
          r_rt: payload.status,
          r_rtmsg: payload.statusText,
          r_loading: false,
        };
      },
  },
});

export default requestSale.reducer;
