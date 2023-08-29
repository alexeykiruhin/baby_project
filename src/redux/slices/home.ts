import {createSlice} from "@reduxjs/toolkit";

export interface homeType {
    flag: string
}

//Начальное значение
const initialState = {
    flag: 'home'
} as homeType

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        changeFlag: (state, action) => {
            state.flag = action.payload
        }
    }
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { changeFlag } = homeSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default homeSlice.reducer;