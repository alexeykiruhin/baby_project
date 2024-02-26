import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '../../api/api';
import {RatingUserType} from '../../types/types';

export interface ratingType {
    count: number
    users: RatingUserType[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: any
}

//Начальное значение
const initialState = {
    count: 0,
    users: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
} as ratingType

//Получаем юзеров
export const getCP = createAsyncThunk('cp', async () => {
    try {
        return await API.CP.getCP()
    } catch (error) {
        throw error;
    }
});

const cpSlice = createSlice({
    name: 'cp',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Обработка getCP
            .addCase(getCP.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log('payload', action.payload)
            })
    },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
// export const { getPosts } = homeSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default cpSlice.reducer;