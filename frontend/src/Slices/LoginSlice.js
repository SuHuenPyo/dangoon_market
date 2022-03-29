import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('POST/SIGNUP',async (payload,{rejectedWithValue})=>{
    const result = null;
    try {  
        result = await axios.post('http://dg-market.iptime.org:28019/home',payload,{
            header: {'content-type': 'multipart/form-data'}
        });
    } catch (err) {
        return rejectedWithValue(err.response);
    }  
    
    return result;
});

const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        rt: null,
        rtmsg: null,
        item: null,
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
            console.log(payload.data.item);
            if(meta.arg.page > 1){
                payload.data.item = state.item.item.concat(payload.data.item);
            }

            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
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