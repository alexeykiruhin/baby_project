import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '../../api/api';
import {PostDataType} from '../../types/types';

export interface ratingType {
    isCreated: boolean
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
}

// Начальное значение
const initialState = {
    isCreated: false,
    status: 'idle',
    error: null,
} as ratingType

// Создание поста
export const createPost = createAsyncThunk('post/createPost', async (postData: PostDataType) => {
    try {
        return await API.Post.createPost(postData);
    } catch (error) {
        throw error;
    }
});

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
         // Добавляем редьюсер для изменения isCreated
        setIsCreated: (state, action) => {
            state.isCreated = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Обработка createPost
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isCreated = action.payload.isCreate
                setIsCreated(false)
            })
    },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { setIsCreated } = postSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default postSlice.reducer;