import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import AppLayout from '@/components/Layouts/AppLayout';
import { Grid, Box } from '@mui/material';
import Link from 'next/link';
import {
    Card,
    CardActionArea,
    Typography,
    CardContent,
    Modal,
} from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '@/components/Layouts/Card';
import Button from '@/components/Button';
import { CircularProgress } from '@mui/material';
import ImageLoader from '@/components/Layouts/ImageLoader';
import BackButton from '@/components/Layouts/backButton';
import ClearIcon from '@mui/icons-material/Clear';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

const PremiDetailPage = ({ detail, league }) => {
    const router = useRouter();
    const { country } = router.query;
    const countryLogos = {
        England: {
            logo: '/Premier_logo.png',
            name: 'Premier League',
        },
        Spain: {
            logo: '/Laliga_log2.jpeg',
            name: 'LaLiga Santander',
        },
        Italy: {
            logo: '/SerieA_logo.webp',
            name: 'SerieA',
        },
        France: {
            logo: '/Ligue1_logo.webp',
            name: 'Ligue1',
        },
        Germany: {
            logo: '/Bundesliga_logo.jpeg',
            name: 'Bundesliga',
        },
    };
    const leagueImg = countryLogos[country].logo;
    const leagueName = countryLogos[country].name;
    // ページコンポーネントの内容
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [leagueStandings, setLeagueStandings] = useState([]);
    const handleOpen = async () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const showStatistic = async () => {
        handleOpen();
        const year = new Date().getFullYear();
        try {
            const apiUrl =
                'https://api-football-v1.p.rapidapi.com/v3/standings';
            const response = await axios.get(apiUrl, {
                params: {
                    season: year - 1,
                    league: league,
                },
                headers: {
                    'X-RapidAPI-Key':
                        'ea55e722f8msh2fd3cb06768de2bp1d6537jsne9964b9d433e',
                    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                },
            });
            const featchData = response.data.response;
            // console.log(featchData[0].league);
            const standingsData = featchData[0].league.standings[0];
            setLeagueStandings(standingsData);
        } catch {
            return { notFound: true };
        } finally {
            setLoading(false);
        }
    };
    // const theme = useTheme();

    return (
        <AppLayout>
            <Box sx={{ marginLeft: '20px', marginTop: '20px' }}>
                <BackButton />
            </Box>
            <Box
                sx={{
                    marginTop: '20px',
                    marginBottom: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    justifyContent: 'center', // 水平方向の中心揃え
                    alignItems: 'center',
                }}>
                <Layout image={leagueImg} sx={{ cursor: 'default' }} />
                <Typography
                    varient="h1"
                    component={'div'}
                    sx={{
                        fontSize: '20px',
                        color: 'white',
                        marginTop: '30px',
                        marginBottom: '25px',
                    }}>
                    {leagueName}
                </Typography>
                <Button onClick={showStatistic}>順位表</Button>
            </Box>
            <Grid
                container
                spacing={{ xs: 1, md: 3 }}
                sx={{
                    // height:{lg:"80vh"},
                    display: 'flex',
                    alignItems: 'center',
                    padding: { xs: '18px', lg: '40px' },
                    // justifyContent:"space-around"
                }}>
                {detail.map(team => (
                    <Grid item key={team.id} xs={4} sm={3} md={2} lg={1.5}>
                        <Card sx={{ borderRadius: '10%', height: '100%' }}>
                            <CardActionArea sx={{ flexGrow: 1 }}>
                                <Link
                                    href={`/detail/${team.team.country}/${league}/team/${team.team.id}?path=${team.team.logo}&name=${team.team.name}&id=${team.team.id}`}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            aspectRatio: '1 / 1',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            // paddingTop:"35px"
                                        }}>
                                        <ImageLoader
                                            src={team.team.logo}
                                            sx={{
                                                display: 'flex',
                                                width: {
                                                    xs: '40px',
                                                    sm: '50px',
                                                    md: '60px',
                                                },
                                                height: {
                                                    xs: '40px',
                                                    sm: '50px',
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
                                            }}>
                                            <Typography
                                                varient="h6"
                                                component={'div'}
                                                noWrap
                                                sx={{
                                                    padding: '5px 10px',
                                                    textAlign: 'center',
                                                    width: '100%',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                }}>
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

            <Modal open={open} onClose={handleClose} sx={{ marginTop: '20px' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',

                        bgcolor: 'background.paper',
                        // border: "2px solid #000",
                        borderRadius: '10px',
                        boxShadow: 24,
                        p: 4,
                        width: { xs: '85%', sm: '80%', md: '70%' },
                        height: { xs: '80%', sm: '90%', md: '90%' },
                        overflowY: 'auto',
                    }}>
                    {loading ? (
                        // ローディング状態の表示
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        // データがロードされた後の表示
                        <>
                            <ClearIcon
                                onClick={handleClose}
                                style={{
                                    marginBottom: '15px',
                                    cursor: 'pointer',
                                }}
                            />
                            <Grid
                                container
                                spacing={{ md: 1 }}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    borderBottom: '1px solid gray',
                                    padding: '2px 2px',
                                    margin: '2px 4px',
                                    textAlign: 'center',
                                }}
                                style={{ width: '100%', margin: 0 }}>
                                <Grid item xs={2}>
                                    <Typography
                                        variant="h6"
                                        component={'div'}
                                        noWrap
                                        sx={{ fontSize: '15px' }}>
                                        順位
                                    </Typography>
                                </Grid>
                                <Grid item xs={1} />
                                <Grid item xs={3}>
                                    <Typography
                                        variant="h6"
                                        component={'div'}
                                        noWrap
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={1}
                                    sx={{
                                        display: {
                                            xs: 'none',
                                            md: 'block',
                                        },
                                    }}>
                                    <Typography
                                        variant="h6"
                                        component={'div'}
                                        noWrap
                                        sx={{ fontSize: '15px' }}>
                                        試合
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={1}
                                    sx={{
                                        display: {
                                            xs: 'none',
                                            md: 'block',
                                        },
                                    }}>
                                    <Typography
                                        variant="h6"
                                        component={'div'}
                                        noWrap
                                        sx={{ fontSize: '15px' }}>
                                        勝
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={1}
                                    sx={{
                                        display: {
                                            xs: 'none',
                                            md: 'block',
                                        },
                                    }}>
                                    <Typography
                                        variant="h6"
                                        component={'div'}
                                        noWrap
                                        sx={{ fontSize: '15px' }}>
                                        分
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={1}
                                    sx={{
                                        display: {
                                            xs: 'none',
                                            md: 'block',
                                        },
                                    }}>
                                    <Typography
                                        variant="h6"
                                        component={'div'}
                                        noWrap
                                        sx={{ fontSize: '15px' }}>
                                        負
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography
                                        variant="h6"
                                        component={'div'}
                                        noWrap
                                        sx={{ fontSize: '15px' }}>
                                        point
                                    </Typography>
                                </Grid>
                            </Grid>
                            {leagueStandings.map(data => (
                                // <SwiperSlide key={data.rank} >
                                <Grid
                                    container
                                    key={data.rank}
                                    spacing={{ md: 1 }}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        borderBottom: '1px solid gray',
                                        margin: '2px 4px',
                                        padding: '2px',
                                        // height:"30px"
                                        textAlign: 'center',
                                    }}
                                    style={{ width: '100%', margin: 0 }}>
                                    <Grid item xs={2}>
                                        <Typography
                                            variant="h6"
                                            component={'div'}
                                            noWrap>
                                            {data.rank}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <ImageLoader
                                            src={data.team.logo}
                                            sx={{
                                                textAlign: 'center',
                                                height: {
                                                    md: '30px',
                                                    xs: '20px',
                                                }, // xsサイズでは30px、smサイズでは20pxに設定
                                                width: {
                                                    md: '30px',
                                                    xs: '20px',
                                                },
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Typography
                                            variant="h6"
                                            component={'div'}
                                            noWrap
                                            sx={{
                                                width: '100%',
                                                fontSize: '15px',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                            }}>
                                            {data.team.name}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                md: 'block',
                                            },
                                        }}>
                                        <Typography
                                            variant="h6"
                                            component={'div'}
                                            noWrap>
                                            {data.all.played}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                md: 'block',
                                            },
                                        }}>
                                        <Typography
                                            variant="h6"
                                            component={'div'}
                                            noWrap
                                            sx={{
                                                display: {
                                                    xs: 'none',
                                                    md: 'block',
                                                },
                                            }}>
                                            {data.all.win}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                md: 'block',
                                            },
                                        }}>
                                        <Typography
                                            variant="h6"
                                            component={'div'}
                                            noWrap>
                                            {data.all.draw}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                md: 'block',
                                            },
                                        }}>
                                        <Typography
                                            variant="h6"
                                            component={'div'}
                                            noWrap>
                                            {data.all.lose}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography
                                            variant="h6"
                                            component={'div'}
                                            noWrap>
                                            {data.points}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                // </SwiperSlide>
                            ))}
                            {/* </Swiper> */}
                        </>
                    )}
                </Box>
            </Modal>
        </AppLayout>
    );
};
export async function getServerSideProps(context) {
    const { country, league } = context.params;
    try {
        const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3/teams';
        const response = await axios.get(apiUrl, {
            params: {
                league: league,
                season: '2023',
                country: country,
            },
            headers: {
                'X-RapidAPI-Key':
                    'ea55e722f8msh2fd3cb06768de2bp1d6537jsne9964b9d433e',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
            },
        });
        const featchData = response.data.response;
        // console.log(searchCountry)
        console.log(response.data.response);
        return {
            props: { detail: featchData, league: league },
        };
    } catch {
        return { notFound: true };
    }
}
export default PremiDetailPage;
