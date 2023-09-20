import { configureStore } from "@reduxjs/toolkit";
import home from './home';
import auth from './auth';
import rating from './rating';
import user from './user';

export const store = configureStore({
    reducer: {
        home: home,
        auth: auth,
        rating: rating,
        user: user
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch