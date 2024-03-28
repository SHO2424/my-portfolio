
import React ,{ useState, useEffect } from 'react';
import { CircularProgress,Box } from '@mui/material';

function ImageLoader({ src, sx }) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const maxRetry = 100 ;

    useEffect(() => {
        // 画像読み込みのための関数
        const loadImage = () => {
            setLoaded(false);
            setError(false);

      const image = new Image();
      image.src = src;
      image.onload = () => setLoaded(true);
      image.onerror = () => {
        if (retryCount < maxRetry) {
          // console.log(`リトライ回数: ${retryCount + 1}`);
          setRetryCount(retryCount + 1);
        } else {
          setError(true);

        }

        loadImage();
    }, [src, retryCount]);

    if (error) {
        return <div>Error loading image.</div>
    }

    return (
        <Box sx={sx}>
            {loaded ? (
                <img
                    src={src}
                    alt="loaded image"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%', // または必要な高さに応じて調整
                    }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    )
}

export default ImageLoader
