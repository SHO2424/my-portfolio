import axios from 'axios';

// CSRFトークンをクッキーから取得する関数
function getCsrfToken() {
    const name = 'XSRF-TOKEN=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

const laravelAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true, // クロスサイトのクッキーを送信するために必要
});

// リクエストが送信される直前に実行されるインターセプターを追加
laravelAxios.interceptors.request.use(config => {
    const token = getCsrfToken();
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['X-XSRF-TOKEN'] = token; // トークンを動的にヘッダーに添付
    return config;
});

export default laravelAxios;
