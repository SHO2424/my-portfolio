import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import laravelAxios from '@/lib/laravelAxios';

function App({ Component, pageProps }) {
    useEffect(() => {
        // CSRFトークンを取得する
        const getCsrfToken = async () => {
            await laravelAxios.get('/sanctum/csrf-cookie', {
                withCredentials: true,
            });
            console.log('CSRFトークンを取得しました');
        };

        getCsrfToken().catch(console.error);
    }, []);

    return <Component {...pageProps} />;
}

export default App;
