import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '../../api/api';
import {CommentDataType} from "../../types/types";

export interface commentType {
    postId: string
    text: string
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
}

//Начальное значение
const initialState = {
    postId: '',
    text: ''
} as commentType

//Получаем юзеров
export const createComment = createAsyncThunk('comment/createComment', async (commentData: CommentDataType) => {
    try {
        return await API.PostComments.createComment(commentData);
    } catch (error) {
        throw error;
    }
});

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Обработка fetchPosts
            .addCase(createComment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.count = action.payload.count;
                // state.users = action.payload.users;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
// export const { getPosts } = homeSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default commentSlice.reducer;