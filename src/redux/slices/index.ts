import {configureStore} from '@reduxjs/toolkit';
import home from './home';
import auth from './auth';
import rating from './rating';
import user from './user';
import post from './post';
import comments from "./comments";
import cp from "./cp";

export const store = configureStore({
    reducer: {
        home,
        auth,
        rating,
        user,
        post,
        comments,
        cp
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch