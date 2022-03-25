import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import CaveSlice from './Slices/CaveSlice';
import HomeSlice from './Slices/HomeSlice';
import Signup from './Slices/SignupSlice';

const Store = configureStore({
    reducer: {
        cave: CaveSlice,
        home: HomeSlice,
        signup: Signup,
    },
    middleware: [...getDefaultMiddleware({serializableCheck:false}),createLogger()],
    devTools: true
})

export default Store;