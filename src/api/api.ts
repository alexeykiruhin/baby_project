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

instance.interceptors.response.use(
    (config) => {
        // console.log('interceptor');
        return config
    },
    async (error) => {
        const originalRequest = error.config;
        console.log(`error status - ${error.response.status}`);
        if (error.response.status === 401) {
            try {
                await axios.get(`${BASE_URL}refresh`, {
                    withCredentials: true,
                    // headers: {'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`}
                }).then((response) => {
                    localStorage.setItem('access_token', response.data.access_token);
                    console.log('set access');
                    return response.data
                }).catch((error) => {
                    console.log(`ошибка - ${error.response.status}`);
                    console.log(`ошибка - logoutThunk`);
                });
                console.log('set local');
                return instance.request(originalRequest);
            } catch (error) {
                console.log('Ошибка авторизации', error);
                // store.dispatch(setInfo(false, { id: null, img: null, username: '' })); // тут нужно затереть данные в auth
                // попробовать затереть локалсторедж ацесс токен
                // window.location.href = '/login';
                return Promise.reject(error);
            }
        } else {
            // window.location.href = '/login';
            console.log('ошибка если удален рефреш токен, после логаута если пойти на страницу защищенную');
            return null
        }
    }
)

export const API = {
    Home: {
        async getPosts(currentPage: number, pageSize: number) {
            const response = await instance.get(`posts?page=${currentPage}&page_size=${pageSize}`);
            return response.data;
        },
        async getSubPosts(currentPage: number, pageSize: number) {
            const response = await instance.get(`subs_posts?page=${currentPage}&page_size=${pageSize}`);
            return response.data;
        },
    },
    Auth: {
        async checkAuth() {
            // console.log('checkAuth');
            const response = await axios.get(`${BASE_URL}refresh`, {
                withCredentials: true,
            });
            return response.data;
        },
        async login(username: string, password: string) {
            const response = await instance.post(`login`, {
                username: username,
                password: password
            });
            return response.data;
        },
        async logout() {
            const response = await instance.get(`logout`);
            return response.data;
        },
    }

}