import { configureStore } from "@reduxjs/toolkit";
import home from './slices/home';

export const store = configureStore({
    reducer: {
        home: home,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch