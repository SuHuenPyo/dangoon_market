import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCaveDetails = createAsyncThunk('GET/CAVEDETAILS',async (payload,{rejectWithValue})=>{
    let result = null;
    try {  
        result = await axios.get('https://localhost/api/cavelife/details',{
            params: {
                boardId: payload,
            }
        });
    } catch (err) {
        if(!err.response){
            throw err;
        }

        return await rejectWithValue(err.response);
    }  
    
    return await result;
});

const CavelifeSlice = createSlice({
    name: 'cavedetails',
    initialState: {
        rt: null,
        rtmsg: null,
        item: null,
        loading: false
    },
    reducers: {},
    extraReducers: {
        // getCaveDetails
        [getCaveDetails.pending]: (state,action)=>{
            return {
                ...state,
                loading: true
            }
        },
        [getCaveDetails.fulfilled]: (state,{meta,payload})=>{
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading:false
            }
        },
        [getCaveDetails.rejected]: (state,{error,payload})=>{
            return {
                ...state,
                rt: payload?.status || error.name,
                rtmsg: payload?.statusText || error.message,
                loading: false
            }
        }
    }
});

export default CavelifeSlice.reducer;