import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProductDetail = createAsyncThunk('GET/PRODUCTDETAIL',async (payload,{rejectWithValue})=>{
    let result = null;
    try {  
        result = await axios.get('http://13.209.89.208:7799/productdetails',{ 
            params: {boardId : payload}
        });
    } catch (err) {
        if(!err.response){
            throw err;
        }

        return await rejectWithValue(err.response);
    }  
    
    return await result;
});

const productDetailSlice = createSlice({
    name: 'productdetails',
    initialState: {
        rt: null,
        rtmsg: null,
        item: null,
        loading: false
    },
    reducers: {},
    extraReducers: {
        [getProductDetail.pending]: (state,action)=>{
            return {
                ...state,
                loading: true
            }
        },
        [getProductDetail.fulfilled]: (state,{meta,payload})=>{
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading:false
            }
        },
        [getProductDetail.rejected]: (state,{error,payload})=>{
            return {
                ...state,
                rt: payload?.status || error.name,
                rtmsg: payload?.statusText || error.message,
                loading: false
            }
        }
    }
});

export default productDetailSlice.reducer;