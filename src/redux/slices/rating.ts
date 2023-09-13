import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '../../api/api';

export interface ratingType {
    users: any,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
}

//Начальное значение
const initialState = {
    users: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
} as ratingType

//Получаем юзеров
export const fetchUsers = createAsyncThunk('rating/getUsers', async () => {
    try {
        return await API.Rating.getUsers();
    } catch (error) {
        throw error;
    }
});

const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Обработка fetchPosts
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
// export const { getPosts } = homeSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default ratingSlice.reducer;