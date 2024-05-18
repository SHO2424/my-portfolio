import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AppLayout from '@/components/Layouts/AppLayout';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';
import { useRouter } from 'next/router';
import ImageLoader from '@/components/Layouts/ImageLoader';
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
    Box,
} from '@mui/material';

const search = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(results);
    const router = useRouter();
    const { query: searchQuery } = router.query;
    console.log(searchQuery);
    useEffect(() => {
        if (!searchQuery) {
            return;
        }
        const fetchMedia = async () => {
            try {
                const apiUrl =
                    'https://api-football-v1.p.rapidapi.com/v3/teams';
                const response = await axios.get(apiUrl, {
                    params: {
                        search: searchQuery,
                    },
                    headers: {
                        'X-RapidAPI-Key':
                            'ea55e722f8msh2fd3cb06768de2bp1d6537jsne9964b9d433e',
                        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                    },
                });
                const fetchData = response.data.response;
                console.log(fetchData);
                setResults(fetchData);
            } catch {
                return { notFound: true };
            } finally {
                setLoading(false);
            }
        };
        fetchMedia();
    }, [searchQuery]);
    return (
        <AppLayout>
            <SearchBar />
            {loading ? (
                <Grid
                    item
                    textAlign={'center'}
                    xs={12}
                    sx={{ height: '550px' }}
                >
                    <Typography sx={{ color: 'white' }}>検索中...</Typography>
                </Grid>
            ) : results.length > 0 ? (
                <Grid
                    container
                    spacing={{ xs: 1, md: 3 }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '50px',
                        padding: { xs: '18px', lg: '40px' },
                    }}
                >
                    {results.map(team => (
                        <Grid item key={team.id} xs={4} sm={3} md={2}>
                            <Card sx={{ borderRadius: '10%', height: '100%' }}>
                                <CardActionArea sx={{ flexGrow: 1 }}>
                                    <Link
                                        href={`/detail/${team.team.country}/league/team/${team.team.id}?path=${team.team.logo}&name=${team.team.name}&id=${team.team.id}`}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                aspectRatio: '1 / 1',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <ImageLoader
                                                src={team.team.logo}
                                                sx={{
                                                    display: 'flex',
                                                    width: {
                                                        xs: '40px',
                                                        md: '60px',
                                                    },
                                                    height: {
                                                        xs: '40px',
                                                        md: '60px',
                                                    },
                                                    textAlign: 'center',
                                                }}
                                            />
                                            <CardContent
                                                sx={{
                                                    padding: 0, // パディングをなくす
                                                    width: '100%',
                                                    '&:last-child': {
                                                        paddingBottom: 0, // CardContentの下部のパディングをなくす
                                                    },
                                                }}
                                            >
                                                <Typography
                                                    varient="h6"
                                                    component={'div'}
                                                    noWrap
                                                    sx={{
                                                        padding: '5px 10px',
                                                        textAlign: 'center',
                                                        width: '100%',
                                                        textOverflow:
                                                            'ellipsis',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {team.team.name}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Link>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Grid
                    item
                    textAlign={'center'}
                    xs={12}
                    sx={{ height: '550px' }}
                >
                    <Typography sx={{ color: 'white' }}>
                        検索結果が見つかりませんでした
                    </Typography>
                </Grid>
            )}
        </AppLayout>
    );
};

export default search;
