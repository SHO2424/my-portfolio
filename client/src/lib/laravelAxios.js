import Axios from 'axios';

// CSRFトークンをクッキーから取得する関数
function getCsrfTokenFromCookies() {
    if (typeof document === 'undefined') {
        // サーバーサイドの実行時はクッキーを取得しない
        return '';
    }
    const csrfTokenCookie = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('XSRF-TOKEN='));
    return csrfTokenCookie
        ? decodeURIComponent(csrfTokenCookie.split('=')[1])
        : '';
}

const laravelAxios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true, // クロスサイトのクッキーを送信するために必要
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// リクエストインターセプターを追加して、リクエストにCSRFトークンを添付
laravelAxios.interceptors.request.use(config => {
    // CSRFトークンをヘッダーに設定
    const csrfToken = getCsrfTokenFromCookies();
    if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    return config;
});

export default laravelAxios;
