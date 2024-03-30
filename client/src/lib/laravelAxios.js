import Axios from 'axios';

const laravelAxios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
});

laravelAxios.interceptors.request.use(config => {
    const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token.split('=')[1]);
    }
    return config;
});
export default laravelAxios;
