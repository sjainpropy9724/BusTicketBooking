import {combineReducers, configureStore} from '@reduxjs/toolkit';
import alertsSlice from './alertsSlice';
import usersSlice from './usersSlice';
const rootReducer = combineReducers({
    alerts: alertsSlice,
    users: usersSlice,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;