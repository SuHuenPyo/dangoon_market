import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getHomeList = createAsyncThunk('GET/HOMELIST',async (payload,{rejectWithValue})=>{
    let result = null;

    try {
        result = await axios.get("https://dg-market.iptime.org/home",{
        params : {page: payload.page,
        rows: 10},
        withCredentials: true,
        })

    } catch (error){
     return rejectWithValue(error.response);
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
                rt: payload.status || error,
                rtmsg: payload.statusText || error.message,
                item: payload.data.text,
                loading: false
            }
        }
    }
});

export default HomeSlice.reducer;