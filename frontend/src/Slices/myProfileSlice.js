import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getMyProfile = createAsyncThunk('GET/PROFILE',async (payload,{rejectWithValue})=>{
        let result = null;

        try {

        result = await axios.get('https://dangoon.duckdns.org/myprofile',{
            params: {
                boardId: payload
            }
        })
        

        } catch (err) {
            return rejectWithValue(err.response);
        }
        
        return result

})

const myProfile = createSlice({
    name: 'myProfile',
    initialState: {
        rt: null,
        rtmsg: null,
        item: [],
        loading: false
    },
    reducers: {},
    extraReducers: {
        [getMyProfile.pending]: (state,action) => {
              return {
                  ...state,
                  loading: true,
              }
        },
        [getMyProfile.fulfilled]: (state,{payload}) => {
            return {
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading:false
            }
      },
      [getMyProfile.rejected]: (state,{payload}) => {
        return {
            ...state,
            rt: payload.status,
            rtmsg: payload.statusText,
            loading:false
        }
  }
    }
})

export default myProfile.reducer;