import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '../../api/api';
import {EditPostType, HomePostType, PostDataType} from '../../types/types';

export interface postType {
    isEdited: boolean
    isCreated: boolean
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
    tags?: Array<string>
    postId?: string
    post?: HomePostType
}

// Начальное значение
const initialState = {
    isEdited: false,
    isCreated: false,
    status: 'idle',
    error: null,
    tags: [],
    postId: '',
    post: {
        author: {
            id: 0,// проверить должна быть строка
            img: '',
            username: ''
        },
        id: '',
        rating: {result: 0},
        tags: [],
        text: '',
        subject: '',
        img: ''
    }
} as postType

// Создание поста
export const createPost = createAsyncThunk('post/createPost', async (postData: PostDataType) => {
    try {
        return await API.Post.createPost(postData);
    } catch (error) {
        throw error;
    }
});

// Получить теги
export const getTags = createAsyncThunk('post/getTags', async () => {
    try {
        return await API.Post.getTags();
    } catch (error) {
        throw error;
    }
});

// Получить пост по его айди (редактирование)
export const getPost = createAsyncThunk('post/getPost', async (postId: EditPostType) => {
    try {
        return await API.Post.getPostById(postId.postId);
    } catch (error) {
        throw error;
    }
});

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        // Добавляем редьюсер для изменения isCreated
        setPostId: (state, action) => {
            state.postId = action.payload;
        },
        // Добавляем редьюсер для изменения isCreated
        setIsCreated: (state, action) => {
            state.isCreated = action.payload;
        },
        // Добавляем редьюсер для изменения isEdited
        setIsEdited: (state, action) => {
            state.isEdited = action.payload;
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
        builder
            // Получить теги
            .addCase(getTags.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tags = action.payload
            })
        builder
            // Получить посты
            .addCase(getPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload
            })
    },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const {setIsCreated, setIsEdited, setPostId} = postSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default postSlice.reducer;