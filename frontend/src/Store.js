import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import CaveSlice from './Slices/CaveSlice';
import HomeSlice from './Slices/HomeSlice';
import Signup from './Slices/SignupSlice';
import Login from './Slices/LoginSlice';
import NewProductSlice from './Slices/NewProductSlice'; 
import ProductDetail from './Slices/ProductDetailSlice'

const Store = configureStore({
    reducer: {
        cave: CaveSlice,
        home: HomeSlice,
        signup: Signup,
        login: Login,
        newproduct: NewProductSlice,
        productdetails: ProductDetail,
    },
    middleware: [...getDefaultMiddleware({serializableCheck:false}),createLogger()],
    devTools: true
})

export default Store;