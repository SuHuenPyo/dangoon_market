import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getHomeList = createAsyncThunk('GET/HOMELIST',async (payload,{rejectedWithValue})=>{
    let result = null;

    try {

        result = axios.get("http://dg-market.iptime.org:28019/home",{
        page:1,
        rows: 10
        })

    } catch (err){
        result = rejectedWithValue(err.response);
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
        [getHomeList.fulfilled]: (state,{payload})=>{
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading:true
            }
        },
        [getHomeList.rejected]: (state,{payload})=>{
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                loading: false
            }
        }
    }
});

export default HomeSlice.reducer;