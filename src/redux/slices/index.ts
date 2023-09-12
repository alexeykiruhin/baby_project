import { configureStore } from "@reduxjs/toolkit";
import home from './home';
import auth from './auth';

export const store = configureStore({
    reducer: {
        home: home,
        auth: auth
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch