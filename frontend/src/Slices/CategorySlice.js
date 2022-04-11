import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategory = createAsyncThunk('GET/CATEGORY',async(payload,{rejectWithValue})=>{
    let result = null;

    try{
        result = await axios.get('https://dangoon.duckdns.org/category',{
            params: {   
                category: payload.category,
                page: payload.page,
                rows: payload.rows,
            }
        });
    } catch(err) {
        return rejectWithValue(err.response);
    }

    return result;
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        rt: null,
        rtmsg: null,
        item: [],
        loading: false
    },
    reducers: {},
    extraReducers: {
        [getCategory.pending] : (state,action) => {
            return {
                ...state,
                loading: true
            }
        },
        [getCategory.fulfilled] : (state,{payload}) => {
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading:false
            }
        },
        [getCategory.rejected] : (state,{payload}) => {
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading:false
            }
        }
    }
})


export default categorySlice.reducer;
