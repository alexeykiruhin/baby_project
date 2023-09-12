import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '../../api/api';
import {PostType} from '../../types/types';

export interface homeType {
    posts: Array<PostType> | Array<null>,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
}

//Начальное значение
const initialState = {
    posts: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
} as homeType

//Получаем посты
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        // const response: ApiResponse = await API.Home.getPosts(1,5);
        // return response;
        console.log('all');
        return await API.Home.getPosts(1,5);
    } catch (error) {
        throw error;
    }
});

//Получаем посты юзеров на кого подписан
export const fetchSubPosts = createAsyncThunk('posts/fetchSubPosts', async () => {
    try {
        // const response: ApiResponse = await API.Home.getPosts(1,5);
        // return response;
        console.log('sub');
        return await API.Home.getSubPosts(1,5);
    } catch (error) {
        throw error;
    }
});

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Обработка fetchPosts
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //Обработка fetchSubPosts
            .addCase(fetchSubPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSubPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload.posts;
            })
            .addCase(fetchSubPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
// export const { getPosts } = homeSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default homeSlice.reducer;