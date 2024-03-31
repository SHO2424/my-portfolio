import Axios from 'axios';

// Axiosインスタンスの作成
const laravelAxios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    // withXSRFToken: true,
});

export default laravelAxios;
