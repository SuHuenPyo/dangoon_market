import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import CaveSlice from './Slices/CaveSlice';
import HomeSlice from './Slices/HomeSlice';
import Signup from './Slices/SignupSlice';
import Login from './Slices/LoginSlice';
import NewProductSlice from './Slices/ProductSlice'; 
import NewCavelife from './Slices/CavelifeSlice'
import ProductDetail from './Slices/ProductDetailSlice';
import CaveDetails from './Slices/CaveDetails'

const Store = configureStore({
    reducer: {
        cave: CaveSlice,
        home: HomeSlice,
        signup: Signup,
        login: Login,
        newproduct: NewProductSlice,
        productdetails: ProductDetail,
        cavelife: NewCavelife,
        cavedetails: CaveDetails
    },
    middleware: [...getDefaultMiddleware({serializableCheck:false}),createLogger()],
    devTools: true
})

export default Store;