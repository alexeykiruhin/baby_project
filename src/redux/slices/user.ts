import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '../../api/api';
import {PostType} from '../../types/types';

export interface userType {
    isMe: boolean,
    userId: string | null,
    username: string,
    img: string,
    statusText: string,
    postsCount: number,
    rating: number,
    plus: number,
    minus: number,
    subscribers: number,
    isSubs: boolean,
    posts: Array<PostType>,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
}

//Начальное значение
const initialState = {
    isMe: false,
    userId: null,
    username: '',
    img: '',
    statusText: '',
    postsCount: 0,
    rating: 0,
    plus: 0,
    minus: 0,
    subscribers: 0,
    isSubs: false,
    posts: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
} as userType

//Проверка аутентификации
export const fetchUser = createAsyncThunk('user/fetchUser', async (userId: string | undefined) => {
    try {
        return await API.User.getUser(userId);
    } catch (error) {
        throw error;
    }
});

//Подписка
export const subscribed = createAsyncThunk('user/subscribe', async (userId: string | null) => {
    try {
        return await API.User.subscribe(userId);
    } catch (error) {
        throw error;
    }
});

//Отписка
export const unsubscribed = createAsyncThunk('user/unsubscribe', async (userId: string | null) => {
    try {
        return await API.User.unsubscribe(userId);
    } catch (error) {
        throw error;
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Обработка fetchPosts
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userId = action.payload.user_info.id;
                state.username = action.payload.user_info.username;
                state.statusText = action.payload.user_info.statusText;
                state.img = action.payload.user_info.img;
                state.postsCount = action.payload.user_info.postsCount;
                state.rating = action.payload.user_info.rating;
                state.minus = action.payload.user_info.minus;
                state.plus = action.payload.user_info.plus;
                state.subscribers = action.payload.user_info.subscribers;
                state.isMe = action.payload.isMe;
                state.isSubs = action.payload.user_info.isSubs;
                state.posts = action.payload.user_posts;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
        // Обработка subscribe
        builder
            .addCase(subscribed.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isSubs = action.payload.subs
            })
        // Обработка unsubscribe
        builder
            .addCase(unsubscribed.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isSubs = action.payload.isSubs
            })
    },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
// export const { getPosts } = homeSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default userSlice.reducer;