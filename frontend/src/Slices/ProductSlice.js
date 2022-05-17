import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postNewProduct = createAsyncThunk('POST/NEWPRODUCT',async (payload,{rejectWithValue})=>{
    let result = null;
    try {  
        result = await axios.post('https://dangoon.duckdns.org/api/home/write',payload,{
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

const NewProductSlice = createSlice({
    name: 'newproduct',
    initialState: {
        rt: null,
        rtmsg: null,
        loading: false
    },
    reducers: {},
    extraReducers: {
        [postNewProduct.pending]: (state,action)=>{
            return {
                ...state,
                loading: true
            }
        },
        [postNewProduct.fulfilled]: (state,{meta,payload})=>{
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                loading:false
            }
        },
        [postNewProduct.rejected]: (state,{error,payload})=>{
            return {
                ...state,
                rt: payload?.status || error.name,
                rtmsg: payload?.statusText || error.message,
                loading: false
            }
        }
    }
});

export default NewProductSlice.reducer;