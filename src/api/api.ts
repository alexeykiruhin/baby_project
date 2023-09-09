import axios, {AxiosInstance} from 'axios';

const BASE_URL: 'http://127.0.0.1:5000/api/' = 'http://127.0.0.1:5000/api/';

// Добавляем заголовки в запросы на сервер
const instance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL
});

//Перехват запроса для добавления токена авторизации
instance.interceptors.request.use((config) => {
    const access_token = localStorage.getItem('access_token');
    config.headers.Authorization = `Bearer ${access_token}`;
    return config
})

export const API = {
    Home: {
        async getPosts(currentPage: number, pageSize: number) {
            const response = await instance.get(`posts?page=${currentPage}&page_size=${pageSize}`);
            return response.data;
        },
    }
}