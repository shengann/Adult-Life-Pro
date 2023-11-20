import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './reducers/apiSlice';
import rootReducer from './reducers/reducers'


const store = configureStore({
    reducer: {
        api: apiSlice.reducer,
        root: rootReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;