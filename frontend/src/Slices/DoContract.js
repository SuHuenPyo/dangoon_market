import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const doApprove = createAsyncThunk('GET/APRROVE',async(payload,{rejectWithValue})=>{
    let result = null;
    
    try {
        result = await axios.get("https://localhost/api/requestpurchase/approve", {
          params: {
             b_id: payload.b_id,
             r_id:payload.r_id,
          }
        });
      } catch (err) {
        return rejectWithValue(err.response);
      }
  
      return result;
});

export const doCancel = createAsyncThunk('DELETE/CANCEL',async(payload,{rejectWithValue})=>{
    let result = null;
    
    try {
        result = await axios.delete("https://localhost/api/requestpurchase/cancel",{
        params:{
             b_id: payload.b_id,
             r_id:payload.r_id,
        }
        });
      } catch (err) {
        return rejectWithValue(err.response);
      }
  
      return result;
});

export const doComplete = createAsyncThunk('GET/COMPELETE',async(payload,{rejectWithValue})=>{
    let result = null;
    
    try {
        result = await axios.put("https://localhost/api/requestpurchase/complete", {
               b_id: payload.b_id,
               r_id:payload.r_id,
        });
      } catch (err) {
        return rejectWithValue(err.response);
      }
  
      return result;
});

const doContract = createSlice({
    name: 'doContract',
    initialState: {
        a_rt: null,
        a_rtmsg: null,
        a_loading: false,
        c_rt: null,
        c_rtmsg:null,
        c_loading:false,
        d_rt: null,
        d_rtmsg:null,
        d_loading:false,
    },
    reducers: {},
    extraReducers: {
        [doApprove.pending]: (state,action)=>{
            return {
                ...state,
                a_loading: true
            }
        },
        [doApprove.fulfilled]: (state,{meta,payload})=>{

            return {
                ...state,
                a_rt: payload.status,
                a_rtmsg: payload.statusText,
                a_loading:false
            }
        },
        [doApprove.rejected]: (state,{error,payload})=>{
            return {
                ...state,
                a_rt: payload?.status || 500,
                a_rtmsg: payload?.statusText || error.message,
                a_loading: false
            }
        },
        [doCancel.pending]: (state,action)=>{
            return {
                ...state,
                c_loading: true
            }
        },
        [doCancel.fulfilled]: (state,{meta,payload})=>{

            return {
                ...state,
                c_rt: payload.status,
                c_rtmsg: payload.statusText,
                c_loading:false
            }
        },
        [doCancel.rejected]: (state,{error,payload})=>{
            return {
                ...state,
                c_rt: payload?.status || 500,
                c_rtmsg: payload?.statusText || error.message,
                c_loading: false
            }
        },
        [doComplete.pending]: (state,action)=>{
            return {
                ...state,
                d_loading: true
            }
        },
        [doComplete.fulfilled]: (state,{meta,payload})=>{

            return {
                ...state,
                d_rt: payload.status,
                d_rtmsg: payload.statusText,
                d_loading:false
            }
        },
        [doComplete.rejected]: (state,{error,payload})=>{
            return {
                ...state,
                d_rt: payload?.status || 500,
                d_rtmsg: payload?.statusText || error.message,
                d_loading: false
            }
        }
    }
});

export default doContract.reducer;