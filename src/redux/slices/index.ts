import {configureStore} from '@reduxjs/toolkit';
import home from './home';
import auth from './auth';
import rating from './rating';
import user from './user';
import post from './post';
// import comment from "./comment";
import comments from "./comments";

export const store = configureStore({
    reducer: {
        home,
        auth,
        rating,
        user,
        post,
        // comment,
        comments,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch