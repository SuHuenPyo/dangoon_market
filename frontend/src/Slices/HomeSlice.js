import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getHomeList = createAsyncThunk('GET/HOMELIST',async (payload,{rejectedWithValue})=>{
    let result = null;

    try {
        result = axios.get("http://dg-market.iptime.org:28019/home",{
        params : {page: payload.page,
        rows: 10}
        })

    } catch (err){
     return rejectedWithValue(err.response);
    }

    return result;
});

const HomeSlice = createSlice({
    name: 'home',
    initialState: {
        rt: null,
        rtmsg: null,
        item: null,
        loading: false
    },
    reducers: {},
    extraReducers: {
        [getHomeList.pending]: (state,action)=>{
            return {
                ...state,
                loading: true
            }
        },
        [getHomeList.fulfilled]: (state,{meta,payload})=>{
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
        [getHomeList.rejected]: (state,{error,payload})=>{
            return {
                ...state,
                rt: payload?.status || error.name,
                rtmsg: payload?.statusText || error.message,
                loading: false
            }
        }
    }
});

export default HomeSlice.reducer;