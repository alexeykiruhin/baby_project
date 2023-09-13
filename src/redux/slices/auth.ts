import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '../../api/api';
import {LoginPass} from '../../types/types';

export interface authType {
    id: string | null,
    username: string,
    img: string,
    isAuth: boolean,
    access_token: string,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
    minus: number
    plus: number
    subscribers: Array<number>
}

//Начальное значение
const initialState = {
    id: null,
    username: '',
    img: '',
    isAuth: false,
    access_token: '',
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
    minus: 0,
    plus: 0,
    subscribers: [],
} as authType

//Проверка аутентификации
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
    try {
        return await API.Auth.checkAuth();
    } catch (error) {
        throw error;
    }
});

//Логин
export const login = createAsyncThunk('auth/login', async ({username, password}: LoginPass) => {
    try {
        let response = await API.Auth.login(username, password);
        let refresh_token = response.refresh_token;
        let access_token = response.access_token;
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('access_token', access_token);
        return response;
    } catch (error) {
        throw error;
    }
});

//Логаут
export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        return await API.Auth.logout();
    } catch (error) {
        throw error;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Обработка fetchPosts
        builder
            .addCase(checkAuth.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuth = action.payload.isAuth;
                state.username = action.payload.user_obj.username;
                state.img = action.payload.user_obj.img;
                state.id = action.payload.user_obj.id;
                state.minus = action.payload.user_obj.minus;
                state.plus = action.payload.user_obj.plus;
                state.subscribers = action.payload.user_obj.subscribers;
                state.access_token = action.payload.access_token;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
        // Обработка login
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuth = action.payload.isAuth;
                state.username = action.payload.user_obj.username;
                state.img = action.payload.user_obj.img;
                state.id = action.payload.user_obj.id;
                state.minus = action.payload.user_obj.minus;
                state.plus = action.payload.user_obj.plus;
                state.subscribers = action.payload.user_obj.subscribers;
                state.access_token = action.payload.access_token;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
        // Обработка logout
        builder
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // зануляем данные об аутентификации
                state.isAuth = false;
                state.username = '';
                state.img = '';
                state.id = '';
                state.minus = 0
                state.plus = 0
                state.subscribers = []
                state.access_token = '';
                localStorage.removeItem('access_token');
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
// export const { getPosts } = homeSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default authSlice.reducer;