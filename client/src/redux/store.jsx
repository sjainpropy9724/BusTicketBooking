import {combineReducers, configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    alerts: alertSlice
});

const store = configureStore({
    reducer: rootReducer
})

export default store;