import Axios from 'axios';

// function getCsrfTokenFromCookies() {
//     // クライアントサイドでのみ実行されることを保証
//     if (typeof document === 'undefined') {
//         return '';
//     }
//     const csrfTokenCookie = document.cookie
//         .split('; ')
//         .find(cookie => cookie.startsWith('XSRF-TOKEN='));
//     console.log(csrfTokenCookie);
//     return csrfTokenCookie
//         ? decodeURIComponent(csrfTokenCookie.split('=')[1])
//         : '';
// }

const laravelAxios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// リクエストインターセプターを追加して、リクエストにCSRFトークンを動的に添付
// laravelAxios.interceptors.request.use(config => {
//     const csrfToken = getCsrfTokenFromCookies();
//     if (csrfToken) {
//         config.headers['X-XSRF-TOKEN'] = csrfToken;
//     }
//     console.log(csrfToken);
//     return config;
// });

export default laravelAxios;
