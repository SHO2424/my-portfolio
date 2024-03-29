import React from 'react';
import { CardMedia, CardActionArea } from '@mui/material';

const Layout = ({ image }) => {
    return (
        <CardActionArea
            sx={{
                width: { xs: '95px', sm: '150px', md: '300px' },
                height: { xs: '95px', sm: '150px', md: '300px' },
                borderRadius: '50%',
                objectFit: 'contain',
            }}
        >
            <CardMedia
                sx={{
                    width: { xs: '95px', sm: '150px', md: '300px' },
                    height: { xs: '95px', sm: '150px', md: '300px' },
                    borderRadius: '50%',
                    objectFit: 'contain',
                }}
                image={image}
            />
        </CardActionArea>
    );
};

export default Layout;
