import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "POST/LOGIN",
  async (payload, { rejectWithValue }) => {
    let result = null;
    try {
      result = await axios.post(
        "https://localhost:7799/login",
        payload,
        { headers: {
          withCredentials: true,
        }
        }
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

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    rt: null,
    rtmsg: null,
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [login.fulfilled]: (state, { meta, payload }) => {
      console.log(payload);
      return {
        ...state,
        rt: payload.status,
        rtmsg: payload.statusText,
        loading: false,
      };
    },
    [login.rejected]: (state, { error, payload }) => {
      return {
        ...state,
        rt: payload?.status || error.name,
        rtmsg: payload?.statusText || error.message,
        loading: false,
      };
    },
  },
});

export default LoginSlice.reducer;
