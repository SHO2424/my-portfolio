import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import Button from './Button';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
const SearchBar = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const handleChange = e => {
        setQuery(e.target.value);
    };
    const searchQuery = e => {
        e.preventDefault();
        if (!query.trim()) {
            return;
        }
        router.push(`search?query=${encodeURIComponent(query)}`);
    };
    return (
        <Box
            component={'form'}
            onSubmit={searchQuery}
            sx={{
                width: { xs: '80%', md: '60%' },
                margin: '50px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: { xs: 'column', md: 'row' },
                border: 'none', // borderを削除しました
                outline: 'none',
            }}>
            <TextField
                id="filled-basic"
                label="Let's search in English !"
                onChange={handleChange}
                fullWidth
                sx={{
                    borderRadius: '30%', // borderRadiusを30pxに保持しました
                    outline: 'none',
                    marginRight: { md: '40px' },
                    marginBottom: { xs: '30px', md: 0 },
                    // backgroundColor: 'white',
                }}
            />
            <Button type="submit" sx={{ textAlign: 'center' }}>
                <SearchIcon />
            </Button>
        </Box>
    );
};

export default SearchBar;
