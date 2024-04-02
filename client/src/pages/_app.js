import 'tailwindcss/tailwind.css';
import React, { useEffect } from 'react';
import laravelAxios from '@/lib/laravelAxios';
function App({ Component, pageProps }) {
    useEffect(() => {
        const getCsrfToken = async () => {
            try {
                const response = await laravelAxios.get('/sanctum/csrf-cookie');
                console.log(response.data);
                console.log('CSRFトークンを取得しました');
            } catch (error) {
                console.error('CSRFトークンの取得に失敗しました', error);
            }
        };

        getCsrfToken();
    }, []);

    return <Component {...pageProps} />;
}

export default App;
