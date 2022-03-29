import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('POST/LOGIN',async (payload,{rejectWithValue})=>{
    let result = null;
    try {  
        result = await axios.post('http://dg-market.iptime.org:28019/login',payload,{
            header: {'content-type': 'multipart/form-data'}
        });
    } catch (err) {
        if(!err.response){
            throw err;
        }
        return rejectWithValue(err.response);
    }  
    
    return result;
});

const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        rt: null,
        rtmsg: null,
        loading: false
    },
    reducers: {},
    extraReducers: {
        [login.pending]: (state,action)=>{
            return {
                ...state,
                loading: true
            }
        },
        [login.fulfilled]: (state,{meta,payload})=>{
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                loading:false
            }
        },
        [login.rejected]: (state,{error,payload})=>{
            return {
                ...state,
                rt: payload?.status || error.name,
                rtmsg: payload?.statusText || error.message,
                loading: false
            }
        }
    }
});

export default LoginSlice.reducer;