import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSearch = createAsyncThunk('GET/SEARCH',async(payload,{rejectWithValue})=>{
    let result = null;

    try{
        result = await axios.get('http://13.209.89.208:7799/home/search',{
            params: {   
                keywords: payload.keywords,
                page: payload.page,
                rows: payload.rows,
            }
        });
    } catch(err) {
        return rejectWithValue(err.response);
    }

    return result;
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        rt: null,
        rtmsg: null,
        item: [],
        loading: false
    },
    reducers: {},
    extraReducers: {
        [getSearch.pending] : (state,action) => {
            return {
                ...state,
                loading: true
            }
        },
        [getSearch.fulfilled] : (state,{payload}) => {
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading:false
            }
        },
        [getSearch.rejected] : (state,{payload,error}) => {
            return {
                ...state,
                rt: payload?.status || 500,
                rtmsg: payload?.statusText || error.message,
                item: payload.data,
                loading:false
            }
        }
    }
})


export default searchSlice.reducer;
