import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
// CSRFトークン取得関数のパスを適切に設定
import { fetchCsrfToken } from '@/lib/laravelAxios';

const App = ({ Component, pageProps }) => {
    useEffect(() => {
        // コンポーネントがマウントされた後にCSRFトークンを取得
        fetchCsrfToken().catch(console.error);
    }, []); // 空の依存配列を渡して、効果がマウント時に1回だけ実行されるようにします。

    return <Component {...pageProps} />;
};

export default App;
