import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLike = createAsyncThunk('GET/LIKE',async (payload,{rejectWithValue})=> {
    let result = null;

    try {
        result = await axios.get('https://dangoon.duckdns.org/like',{
            params : {
            b_id: payload.boardId,
            l_type: payload.type,
            l_flag: payload.flag
            }
        });
    } catch (err) {
        return rejectWithValue(err.response);
    }

    return result;
})


const likeSlice = createSlice({
    name: 'like',
    initialState: {
        l_rt: null,
        l_rtmsg: null,
        l_item: null,
        l_loading: null,
    },
    reducers: {},
    extraReducers: {
        [getLike.pending] : (state,action) => {
            return {
                ...state,
                l_loading: true
            }
        },
        [getLike.fulfilled] : (state,{payload}) => {
            return {
                ...state,
                l_rt: payload.status,
                l_rtmsg: payload.statusText,
                l_item: payload.data,
                l_loading: false,
            }
        },
        [getLike.rejected] : (state,{error,payload}) => {
            return {
                l_rt: payload?.status || 500,
                l_rtmsg: payload?.statusText || "Sever Error",
                l_loading: false
            }
        }
    }
})

export default likeSlice.reducer;
