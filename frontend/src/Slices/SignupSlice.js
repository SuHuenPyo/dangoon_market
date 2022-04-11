import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signup = createAsyncThunk('POST/SIGNUP',async (payload,{rejectWithValue})=>{
    let result = null;
    try {  
        result = await axios.post('https://dangoon.duckdns.org/signup',payload);
    } catch (err) {
        return rejectWithValue(err.response);
    }  
    
    return result;
});

const SignupSlice = createSlice({
    name: 'signup',
    initialState: {
        rt: null,
        rtmsg: null,
        item: null,
        loading: false
    },
    reducers: {},
    extraReducers: {
        [signup.pending]: (state,action)=>{
            return {
                ...state,
                loading: true
            }
        },
        [signup.fulfilled]: (state,{meta,payload})=>{
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading:false
            }
        },
        [signup.rejected]: (state,{error,payload})=>{
            return {
                ...state,
                rt: payload?.status || error.name,
                rtmsg: payload?.statusText || error.message,
                loading: false
            }
        }
    }
});

export default SignupSlice.reducer;