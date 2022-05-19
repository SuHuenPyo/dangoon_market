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
import CaveComment from './Slices/CaveCommentSlice'
import CategorySlice from  './Slices/CategorySlice'
import SearchSlice from  './Slices/SearchSlice'
import LikeSlice from './Slices/LikeSlice';
import RequestSale from './Slices/RequestSaleSlice';
import doContract from './Slices/DoContract'
import BuyHistorySlice from './Slices/BuyHistorySlice';
import ProfileSlice from './Slices/ProfileSlice';

const Store = configureStore({
    reducer: {
        cave: CaveSlice,
        home: HomeSlice,
        signup: Signup,
        login: Login,
        newproduct: NewProductSlice,
        productdetails: ProductDetail,
        cavelife: NewCavelife,
        cavedetails: CaveDetails,
        cavecomment: CaveComment,
        category: CategorySlice,
        search: SearchSlice,
        like: LikeSlice,
        requestSale: RequestSale,
        doContract: doContract,
        buyhistory: BuyHistorySlice,
        profile: ProfileSlice,
    },
    middleware: [...getDefaultMiddleware({serializableCheck:false})],
    devTools: false
})

export default Store;