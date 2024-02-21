import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '../../api/api';
import {CommentDataType, CommentType, PostIdType} from "../../types/types";

interface CommentState {
    comments: Array<CommentType>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: any;
}

const initialState: CommentState = {
    comments: [],
    status: 'idle',
    error: null,
};

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
    reducers: {},
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
        // .addMatcher(
        //     (action) =>
        //         [createComment.pending, createComment.rejected, getCommentsByPostId.pending, getCommentsByPostId.rejected].includes(
        //             action.type
        //         ),
        //     (state) => {
        //         state.status = 'loading';
        //     }
        // )
        // .addMatcher(
        //     (action) =>
        //         //createComment.fulfilled, createComment.rejected,
        //         [getCommentsByPostId.fulfilled].includes(
        //             action.type
        //         ),
        //     (state, action) => {
        //         state.status = 'idle';
        //         console.log('action', action)
        //         state.comments = action.payload;
        //     }
        // )
        // .addMatcher(
        //     (action) =>
        //         [createComment.rejected, getCommentsByPostId.rejected].includes(action.type),
        //     (state, action) => {
        //         state.status = 'failed';
        //         state.error = action.error.message;
        //     }
        // );
    },
});

export default commentsSlice.reducer;


// ----------------------

// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {API} from '../../api/api';
// import {CommentType, PostIdType} from "../../types/types";
//
// export interface commentArrayType {
//     comments: Array<CommentType>
//     status: 'idle' | 'loading' | 'succeeded' | 'failed',
//     error: any
// }
//
// //Начальное значение
// const initialState = {
//     comments: [],
//     status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
//     error: null,
// } as commentArrayType
//
// //Получаем комментарии по айди поста
// export const getCommentsByPostId = createAsyncThunk('comments/getCommentsById', async (postId: PostIdType) => {
//     try {
//         return await API.PostComments.getCommentsByPostId(postId.postId);
//     } catch (error) {
//         throw error;
//     }
// });
//
// const commentsSlice = createSlice({
//     name: 'comments',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Обработка fetchPosts
//             .addCase(getCommentsByPostId.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(getCommentsByPostId.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.comments = action.payload;
//             })
//             .addCase(getCommentsByPostId.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//     },
// });
//
// // Слайс генерирует действия, которые экспортируются отдельно
// // Действия генерируются автоматически из имен ключей редьюсеров
// // export const { getPosts } = homeSlice.actions;
//
// // По умолчанию экспортируется редьюсер, сгенерированный слайсом
// export default commentsSlice.reducer;