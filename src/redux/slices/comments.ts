import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '../../api/api';
import {CommentType, PostIdType} from "../../types/types";

export interface commentArrayType {
    comments: Array<CommentType>
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
}

//Начальное значение
const initialState = {
    comments: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
} as commentArrayType

//Получаем юзеров
export const getCommentsById = createAsyncThunk('comments/getCommentsById', async (postId: PostIdType) => {
    try {
        return await API.PostComments.getCommentsById(postId.postId);
    } catch (error) {
        throw error;
    }
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Обработка fetchPosts
            .addCase(getCommentsById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCommentsById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = action.payload;
            })
            .addCase(getCommentsById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
// export const { getPosts } = homeSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default commentsSlice.reducer;