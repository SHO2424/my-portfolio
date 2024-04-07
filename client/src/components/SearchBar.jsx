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
                // borderRadius:"10px"
            }}>
            <TextField
            id="filled-basic"
                label="検索する"  
                
                onChange={handleChange}
                fullWidth
                // placeholder="検索する"
                sx={{
                    marginRight: { md: '40px' },
                    marginBottom: { xs: '30px', md: 0 },
                    // padding:{xs:'11.5px 14px',md:"15px 14px"},
                    //   boxShadow:"0 2px 3px rgba(0,0,0,0.1)",
                    backgroundColor: 'white',
                    border: 'none',
                    // borderRadius: '30px',
                }}
            />
            <Button type="submit" sx={{ textAlign: 'center' }}>
                <SearchIcon />
            </Button>
        </Box>
    );
};

export default SearchBar;
