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

                boxShadow: '3px 3px 5px rgb(14 12 12 / 45%)',
                transition: 'all .3s',
                '&:hover': {
                    transform: 'translate(3px,3px)',
                },
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
