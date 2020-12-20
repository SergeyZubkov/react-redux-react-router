import {configureStore} from '@reduxjs/toolkit';
import authorizationSlice from '../features/login/authorizationSlice';
import profileSlice from '../features/profile/profileSlice';
import newsSlice from '../features/news/newsSlice';

export default configureStore({
    reducer: {
        authorization: authorizationSlice,
        profile: profileSlice,
        news: newsSlice
    }
})