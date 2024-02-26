import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '../../api/api';
import {CommentDataType, CommentType, PostIdType} from "../../types/types";

interface CommentState {
    isEditComment: boolean
    comments: Array<CommentType>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: any;
}

const initialState: CommentState = {
    isEditComment: false,
    comments: [],
    status: 'idle',
    error: null,
};

// Редактирование комментария
export const editComment = createAsyncThunk('comments/editComment', async (commentData: CommentDataType) => {
    try {
        return await API.PostComments.editComment(commentData)
    } catch (error) {
        throw error;
    }
});

// Удаление комментария
export const deleteComment = createAsyncThunk('comments/deleteComment', async (id: string) => {
    try {
        return await API.PostComments.deleteComment(id)
    } catch (error) {
        throw error;
    }
});

// Создание комментария
export const createComment = createAsyncThunk(
    'comments/createComment',
    async (commentData: CommentDataType) => {
        try {
            return await API.PostComments.createComment(commentData);
        } catch (error) {
            throw error;
        }
    }
);

export const getCommentsByPostId = createAsyncThunk(
    'comments/getCommentsByPostId',
    async (postId: PostIdType) => {
        try {
            // Assuming API response has a data property with the comments
            return await API.PostComments.getCommentsByPostId(postId.postId);
        } catch (error) {
            throw error;
        }
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        toggleEditComment: (state) => {
            console.log('toggleEditComment')
            state.isEditComment = !state.isEditComment
            // state.isEditComment = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createComment.fulfilled, (state, action) => {
                state.comments.push(action.payload); // Assuming action.payload is the new comment
                console.log('createCommentaction', action)

            })
            .addCase(getCommentsByPostId.fulfilled, (state, action) => {
                state.comments = action.payload; // Assuming action.payload is an array of comments
                console.log('action', action)
            })
            .addCase(editComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const neWcomment = action.payload
                console.log('edit', neWcomment.id)
                let updateComment: CommentType
                const commentIndex = state.comments.findIndex((c) => {
                    console.log(c.id)
                    return c.id === neWcomment.id
                })
                updateComment = {...state.comments[commentIndex], text: neWcomment.text}
                // обновляем массив постов по частям
                state.comments = [
                    ...state.comments.slice(0, commentIndex),
                    updateComment,
                    ...state.comments.slice(commentIndex + 1)
                ]
                // console.log('postIndex', postIndex)
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log('delete', action.payload)
                const data = action.payload
                const commentIndex = state.comments.findIndex((c) => {
                    console.log(c.id)
                    return c.id === data.id
                })
                // обновляем массив постов по частям
                state.comments = [
                    ...state.comments.slice(0, commentIndex),
                    ...state.comments.slice(commentIndex + 1)
                ]
            })
    },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const {toggleEditComment} = commentsSlice.actions;


export default commentsSlice.reducer;
