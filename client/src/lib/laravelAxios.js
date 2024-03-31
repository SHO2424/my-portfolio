import Axios from 'axios';

// Axiosインスタンスの作成
const laravelAxios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, // クッキーを含むリクエストを送信するために必要
});

// CSRFトークンを取得してセットする関数
const fetchCsrfToken = async () => {
  await laravelAxios.get('/sanctum/csrf-cookie');
};

// リクエストインターセプタを追加
// すべてのリクエストの前にCSRFトークンがクッキーにセットされているかを確認し、
// 必要に応じてCSRFトークンを取得します
laravelAxios.interceptors.request.use(async (config) => {
  // CSRFトークンが必要なリクエストタイプの場合（通常は "GET" 以外）
  // ここでは簡単化のためにすべてのリクエストで実行しています
  await fetchCsrfToken();

  // CSRFトークンがクッキーにセットされた後、リクエスト設定を返してリクエストを続行
  return config;
}, (error) => {
  // リクエストエラーの処理
  return Promise.reject(error);
});

export default laravelAxios;
