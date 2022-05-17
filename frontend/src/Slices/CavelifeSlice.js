import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postNewCavelife = createAsyncThunk('POST/NEWCAVELIFE',async (payload,{rejectWithValue})=>{
    let result = null;
    try {  
        result = await axios.post('https://127.0.0.1:7799/cavelife/write',payload,{
            header: {'content-type': 'multipart/form-data'}
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
    name: 'cavelife',
    initialState: {
        rt: null,
        rtmsg: null,    
        item: null,
        loading: false
    },
    reducers: {},
    extraReducers: {
        [postNewCavelife.pending]: (state,action)=>{
            return {
                ...state,
                loading: true
            }
        },
        [postNewCavelife.fulfilled]: (state,{meta,payload})=>{
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                loading:false
            }
        },
        [postNewCavelife.rejected]: (state,{error,payload})=>{
            return {
                ...state,
                rt: payload?.status || error.name,
                rtmsg: payload?.statusText || error.message,
                loading: false
            }
        },
    }
});

export default CavelifeSlice.reducer;