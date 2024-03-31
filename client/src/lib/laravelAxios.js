import Axios from 'axios';

function getCsrfToken() {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN'))
        ?.split('=')[1];
}
// Axiosインスタンスの作成
const laravelAxios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': decodeURIComponent(getCsrfToken()),
    },
    withCredentials: true,
    withXSRFToken: true,
});

export default laravelAxios;
