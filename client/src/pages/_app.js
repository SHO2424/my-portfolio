import 'tailwindcss/tailwind.css';
import React, { useEffect } from 'react';
import laravelAxios from '@/lib/laravelAxios';
function App({ Component, pageProps }) {
    useEffect(() => {
        // CSRFトークンを取得する
        const getCsrfToken = async () => {
            await laravelAxios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/sanctum/csrf-cookie`,
                { withCredentials: true },
            );
            console.log('CSRFトークンを取得しました');
        };

        getCsrfToken().catch(console.error);
    }, []);

    return <Component {...pageProps} />;
}

export default App;
