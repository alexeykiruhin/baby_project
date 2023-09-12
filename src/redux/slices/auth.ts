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
} as authType

// "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NDUyNjkyOCwianRpIjoiMTEyZWU3M2YtMTYzMC00Zjg4LTlmN2YtOGY0YWZjOTYyZmRhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjk0NTI2OTI4LCJjc3JmIjoiYzE3MGY0NmMtMTUyMy00Zjc0LWIyYWYtODU1MjhlMTljNTJkIiwiZXhwIjoxNjk0NTI2OTMzfQ.oBgiH0rJykkND-2Wmg2CdUTDNfEBgpjLOxlOoOew_rM",
//     "isAuth": true,
//     "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NDUyNjkyOCwianRpIjoiYWRhYmQwYzUtYTVjMy00MDMxLWJiNGItMzQzMTcxMWIwMDg1IiwidHlwZSI6InJlZnJlc2giLCJzdWIiOjEsIm5iZiI6MTY5NDUyNjkyOCwiY3NyZiI6Ijk4MDJmN2QwLTUzNWEtNGUwZi1hODFlLTU1YWFkMDFiMTUwNSIsImV4cCI6MTY5NzExODkyOH0.LoeKm9WtSHdpGtmvf7xv1ehqK-qZChy-DJwN7l_Kk2M",
//     "user_obj": {
//         "id": 1,
//         "img": "https://randomuser.me/api/portraits/women/69.jpg",
//         "minus": 0,
//         "plus": 0,
//         "subscribers": [
//             21
//         ],
//         "username": "Alice"
//     }

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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Обработка fetchPosts
            .addCase(checkAuth.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuth = action.payload.isAuth;
                state.username = action.payload.user_obj.username;
                state.img = action.payload.user_obj.img;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Обработка login
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuth = action.payload.isAuth;
                state.username = action.payload.user_obj.username;
                state.img = action.payload.user_obj.img;
            })
            .addCase(login.rejected, (state, action) => {
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