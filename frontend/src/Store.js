import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import CaveSlice from './Slices/CaveSlice';

const Store = configureStore({
    reducer: {
        cave: CaveSlice,
    },
    middleware: [...getDefaultMiddleware({serializableCheck:false}),createLogger()],
    devTools: true
})

export default Store;