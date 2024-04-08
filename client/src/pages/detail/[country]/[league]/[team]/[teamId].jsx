import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '@/components/Layouts/AppLayout';
import { Grid, Box, Rating, CircularProgress } from '@mui/material';
import {
    Card,
    CardActionArea,
    Typography,
    CardMedia,
    CardContent,
    Modal,
    ButtonGroup,
} from '@mui/material';
// import Button from '@mui/material/Button';
import laravelAxios from '@/lib/laravelAxios';
import StarIcon from '@mui/icons-material/Star';
import ImageLoader from '@/components/Layouts/ImageLoader';
import BackButton from '@/components/Layouts/backButton';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useAuth } from '@/hooks/auth';

const TeamDetailPage = ({ detail }) => {
    const [activeSquads, setActiveSquads] = useState([]);
    const [reviewOpen, setReviewOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [reviewsOpen, setReviewsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const [playerDetail, setPlayerDetail] = useState({});
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);
    const [averageRating, setAverageRating] = useState(null);

    const [editMode, setEditMode] = useState(null);
    const [editedRating, setEditedRating] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const router = useRouter();
    const { user } = useAuth({ middleware: 'auth' });
    const { path } = router.query; // クエリパラメータからuserIdを取得
    const { name } = router.query; // クエリパラメータからuserIdを取得
    const { id } = router.query; // クエリパラメータからuserIdを取得
    const { country } = router.query;
    const { league } = router.query;
    const maxLength = '30';
    console.log(country);
    console.log(league);
    console.log({ id });

    console.log(detail);
    useEffect(() => {
        if (
            !detail ||
            detail.length === 0 ||
            !detail[0].players ||
            detail[0].players.length === 0
        ) {
            setIsEmpty(true);
            setLoading(false);
        } else {
            const fetchReviews = async () => {
                // const squads =useCallback(detail[0].players,[detail]);
                const squads = detail[0].players;
                try {
                    setIsEmpty(false);
                    setActiveSquads(squads);
                    console.log(activeSquads);
                    console.log('再レンダリング！');
                    const response = await laravelAxios.get(
                        `api/reviews/${id}`,
                    );
                    const fetchData = response.data;
                    console.log(fetchData);
                    setReviews(fetchData);
                    updateAverageRating(fetchData);
                    setLoading(false);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchReviews();
        }
    }, [id]);

    const handleOpen = async () => {
        setReviewOpen(true);
    };
    const detailHandleOpen = async () => {
        setDetailOpen(true);
    };
    const handleClose = () => {
        setReviewOpen(false);
    };
    const detailHandleClose = () => {
        setDetailOpen(false);
    };
    const handleReviewChange = e => {
        setReview(e.target.value);
        console.log(review);
    };
    const handleRatingChange = (e, newValue) => {
        // console.log(newValue);
        setRating(newValue);
        console.log(rating);
    };
    const handleEdit = review => {
        console.log('editing');
        setEditMode(review.id);
        setEditedRating(review.rating);
        setEditedContent(review.content);
    };
    const isButtonDisabled = (rating, content) => {
        return !rating || !content.trim();
    };
    const isReviewbuttonDisabled = isButtonDisabled(rating, review);
    const isEditbuttonDisabled = isButtonDisabled(editedRating, editedContent);

    const handlePlayer = async player => {
        detailHandleOpen();
        const playerId = player.id;
        console.log(playerId);
        const result = activeSquads.find(function (player) {
            return player.id === playerId;
        });
        console.log(result);
        setPlayerDetail(result);
        setSelectedPlayerId(playerId);
        console.log('Clicked Player ID:', selectedPlayerId);
    };
    const handleConfirmEdit = async reviewId => {
        console.log(reviewId);
        try {
            const response = await laravelAxios.put(`api/reviews/${reviewId}`, {
                content: editedContent,
                rating: editedRating,
            });
            const updatedReview = response.data;
            console.log(updatedReview);
            const updatedReviews = reviews.map(review => {
                if (review.id == reviewId) {
                    return {
                        ...review,
                        content: updatedReview.content,
                        rating: updatedReview.rating,
                    };
                }
                return review;
            });
            console.log(updatedReviews);
            setReviews(updatedReviews);
            updateAverageRating(updatedReviews);
            setEditMode(null);
        } catch (err) {
            console.log(err);
        }
    };

    const handleReviewAdd = async () => {
        handleClose();
        console.log(id);
        try {
            const response = await laravelAxios.post(`api/reviews`, {
                content: review,
                rating: rating,
                team_id: id,
            });
            const newRating = response.data;
            console.log(newRating);
            setReviews([...reviews, newRating]);
            console.log(reviews);
            setRating(0);
            const updateReviews = [...reviews, newRating];
            updateAverageRating(updateReviews);
        } catch (err) {
            console.log(err);
        }
    };

    const updateAverageRating = updateReviews => {
        if (updateReviews.length > 0) {
            const totalRating = updateReviews.reduce(
                (acc, review) => acc + review.rating,
                0,
            );
            console.log(totalRating);
            console.log(updateReviews.length);
            const average = (totalRating / updateReviews.length).toFixed(1);
            console.log(average);
            setAverageRating(average);
        } else {
            setAverageRating(null);
        }
    };
    const handleReviewsOpen = () => {
        setReviewsOpen(true);
    };
    const handleReviewsClose = () => {
        setReviewsOpen(false);
    };
    const handleDelete = async id => {
        console.log(id);
        if (window.confirm('レビューを本当に削除してもよろしいですか')) {
            try {
                const response = await laravelAxios.delete(`api/review/${id}`);
                console.log(response);
                const filteredReviews = reviews.filter(
                    review => review.id !== id,
                );
                setReviews(filteredReviews);
                updateAverageRating(filteredReviews);
            } catch (err) {
                console.log(err);
            }
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}>
                <CircularProgress /> {/* 読み込み中の表示 */}
            </div>
        );
    }

    if (isEmpty) {
        return (
            <AppLayout>
                <Box sx={{ marginLeft: '20px', marginTop: '20px' }}>
                    <BackButton />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}>
                    <Typography sx={{ color: 'white' }}>
                        データが存在しません
                    </Typography>
                </Box>
            </AppLayout>
        );
    }
    return (
        <AppLayout>
            <Box sx={{ marginLeft: '20px', marginTop: '20px' }}>
                <BackButton />
            </Box>
            <Box
                // onClick={handleOpen}
                sx={{ marginTop: '20px' }}>
                <Grid
                    item
                    xs={10}
                    md={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center', // 水平方向の中心揃え
                        alignItems: 'center',
                    }}>
                    <Box
                        component="img"
                        sx={{
                            width: { xs: '95px', md: '150px' },
                            height: { xs: '95px', md: '150px' },
                            objectFit: 'contain',
                        }}
                        src={path}
                    />
                    <Typography
                        varient="h6"
                        component={'div'}
                        sx={{
                            color: 'white',
                            marginTop: '20px',
                            marginBottom: '15px',
                        }}
                        noWrap>
                        {name}
                    </Typography>
                    <Rating
                        sx={{ marginBottom: '10px' }}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon sx={{ color: 'white' }} />}
                        value={parseFloat(averageRating)}
                    />
                    <Typography
                        sx={{ color: 'white', marginBottom: '20px' }}
                        variant="h6"
                        component="h2">
                        {averageRating}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Button onClick={handleOpen}>チームを評価する</Button>
                        <Button
                            onClick={handleReviewsOpen}
                            style={{ marginLeft: '10px' }}>
                            コメントを見る
                        </Button>
                    </Box>
                </Grid>
            </Box>
            <Grid
                container
                spacing={2}
                sx={{
                    display: 'flex',
                    alignItems: 'stretch',
                    marginTop: '50px',
                    padding: '40px',
                }}>
                {activeSquads.map(player => (
                    <Grid
                        item
                        key={player.id}
                        xs={4}
                        lg={1.5}
                        onClick={() => handlePlayer(player)}>
                        <Card sx={{ borderRadius: '3%', height: '100%' }}>
                            <CardActionArea sx={{ height: '100%' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        height: '100%',
                                        justifyContent: 'space-bewtween',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}>
                                    <ImageLoader
                                        src={player.photo}
                                        style={{
                                            display: 'inlineBlock',
                                            width: '100%',
                                            textAlign: 'center',
                                        }}
                                    />
                                    <CardContent sx={{ width: '100%' }}>
                                        <Typography
                                            varient="h6"
                                            component={'div'}
                                            sx={{
                                                textAlign: 'center',
                                                width: '100%',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                            }}>
                                            {player.name}
                                        </Typography>
                                    </CardContent>
                                </Box>
                                {/* </Link> */}
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Modal open={reviewOpen} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        // height:"60%",
                        width: { xs: '50%', sm: '40%' },
                        bgcolor: 'background.paper',
                        // border: "2px solid #000",
                        borderRadius: '10px',
                        boxShadow: 24,
                        p: 4,
                    }}>
                    <Typography
                        // sx={{textAlign:"center"}}
                        variant="h6"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            fontSize: { xs: '15px', sm: '1.25rem' },
                        }}>
                        チームを評価する
                    </Typography>
                    <Box
                        sx={{
                            paddingTop: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                        }}>
                        <Rating
                            required
                            onChange={handleRatingChange}
                            sx={{ margin: 'auto', paddingBottom: '20px' }}
                        />
                        <TextareaAutosize
                            // minRows={2}
                            maxLength={maxLength}
                            style={{
                                width: '100%',
                                marginTop: '10px',
                                marginBottom: '10px',
                            }}
                            placeholder="Maximum 20 characters"
                            onChange={handleReviewChange}
                            value={review}
                        />
                        <Button
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                margin: 'auto',
                            }}
                            variant="outlined"
                            disabled={isReviewbuttonDisabled}
                            onClick={handleReviewAdd}>
                            送信
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal open={reviewsOpen} onClose={handleReviewsClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        // height:"60%",
                        // width: '70%',
                        bgcolor: 'background.paper',
                        // border: "2px solid #000",
                        borderRadius: '10px',
                        boxShadow: 24,
                        p: 2,
                        width: { xs: '85%', sm: '80%', md: '70%' },
                        height: { xs: '80%', sm: '90%', md: '90%' },
                        overflowY: 'auto',
                    }}>
                    {reviews.length > 0 ? (
                        // <Swiper
                        //     mousewheel={{
                        //         sensitivity: 10,
                        //         releaseOnEdges: true,
                        //     }}
                        //     direction={'vertical'}
                        //     modules={[
                        //         Navigation,
                        //         Pagination,
                        //         Scrollbar,
                        //         A11y,
                        //         Mousewheel,
                        //     ]}
                        //     style={{
                        //         marginTop: '20px',
                        //         padding: '15px',
                        //         height: '80vh',
                        //         cursor: 'pointer',
                        //     }}
                        //     //  scrollbar={{ draggable: "true" }}
                        //     spaceBetween={5}
                        //     slidesPerView={3}
                        //     //  breakpoints={{
                        //     //   320: {
                        //     //     slidesPerView: 15,
                        //     //     spaceBetween: 10,
                        //     //   }
                        //     // }}
                        // >
                        reviews.map(review => (
                            <Grid
                                container
                                spacing={3}
                                style={{ marginBottom: '10px' }}
                                key={review.id}>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography
                                                component={'div'}
                                                variant="h6"
                                                gutterBottom>
                                                {review.user.name}
                                            </Typography>
                                            {editMode == review.id ? (
                                                <>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'space-between',
                                                        }}>
                                                        <Rating
                                                            value={editedRating}
                                                            onChange={(
                                                                e,
                                                                newValue,
                                                            ) => {
                                                                setEditedRating(
                                                                    newValue,
                                                                );
                                                            }}
                                                        />
                                                        <div>
                                                            {editedContent.length >=
                                                            maxLength ? (
                                                                // 文字数が maxLength に達した場合
                                                                <span>
                                                                    maxLength:{' '}
                                                                    {maxLength}
                                                                </span>
                                                            ) : (
                                                                // それ以外の場合、現在の文字数と maxLength を表示
                                                                <span>
                                                                    {
                                                                        editedContent.length
                                                                    }{' '}
                                                                    /{' '}
                                                                    {maxLength}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </Box>
                                                    <div>
                                                        <textarea
                                                            value={
                                                                editedContent
                                                            }
                                                            maxLength={
                                                                maxLength
                                                            }
                                                            // minRows={1}
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            onChange={e => {
                                                                setEditedContent(
                                                                    e.target
                                                                        .value,
                                                                );
                                                            }}
                                                        />
                                                        {/* <div>
                                                                {editedContent.length >= maxLength ? (
                                                                // 文字数が maxLength に達した場合
                                                                <span>maxLength: {maxLength}</span>
                                                                ) : (
                                                                // それ以外の場合、現在の文字数と maxLength を表示
                                                                <span>
                                                                    {editedContent.length} / {maxLength}
                                                                </span>
                                                                )}
                                                            </div> */}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <Rating
                                                        value={review.rating}
                                                        readOnly
                                                        sx={{
                                                            marginBottom: '6px',
                                                        }}
                                                    />
                                                    {/* <Link href={`/detail/${media_type}/${media_id}/review/${review.id}`}> */}
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        paragraph
                                                        sx={{
                                                            marginBottom: '6px',
                                                        }}>
                                                        {review.content}
                                                    </Typography>
                                                    {/* </Link> */}
                                                </>
                                            )}

                                            {user?.id == review.user.id && (
                                                <Grid
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'flex-end',
                                                    }}>
                                                    {editMode === review.id ? (
                                                        <Button
                                                            disabled={
                                                                isEditbuttonDisabled
                                                            }
                                                            variant="outlined"
                                                            onClick={() =>
                                                                handleConfirmEdit(
                                                                    review.id,
                                                                )
                                                            }>
                                                            編集確定
                                                        </Button>
                                                    ) : (
                                                        <ButtonGroup>
                                                            <Button
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        review,
                                                                    )
                                                                }>
                                                                編集
                                                            </Button>
                                                            <Button
                                                                color="error"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        review.id,
                                                                    )
                                                                }>
                                                                削除
                                                            </Button>
                                                        </ButtonGroup>
                                                    )}
                                                </Grid>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        ))
                    ) : (
                        <Typography
                            variant="h6"
                            color="textSecondary"
                            align="center">
                            コメントがありません
                        </Typography>
                    )}
                </Box>
            </Modal>
            <Modal open={detailOpen} onClose={detailHandleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: { xs: '70%', md: '40%' },
                        bgcolor: 'background.paper',
                        // border: "2px solid #000",
                        borderRadius: '10px',
                        boxShadow: 24,
                        p: 4,
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingTop: '35px',
                        }}>
                        <CardMedia
                            component={'img'}
                            sx={{
                                width: 1 / 3,
                            }}
                        />
                        <ImageLoader
                            src={playerDetail.photo}
                            style={{ borderRadius: '50%' }}
                        />
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginTop: '20px',
                            }}>
                            <Typography varient="h6" component={'div'} noWrap>
                                name:&nbsp;{playerDetail.name}
                            </Typography>
                            <Typography varient="h6" component={'div'} noWrap>
                                position:&nbsp;{playerDetail.position}
                            </Typography>
                            <Typography varient="h6" component={'div'} noWrap>
                                age:&nbsp;{playerDetail.age}
                            </Typography>
                            <Typography varient="h6" component={'div'} noWrap>
                                number:&nbsp;{playerDetail.number}
                            </Typography>
                        </CardContent>
                    </Box>
                    {/* </Link> */}
                    {/* </Card>  */}
                </Box>
            </Modal>
        </AppLayout>
    );
};
export async function getServerSideProps(context) {
    const { teamId } = context.params;
    try {
        const apiUrl =
            'https://api-football-v1.p.rapidapi.com/v3/players/squads';
        const response = await axios.get(apiUrl, {
            params: {
                team: teamId,
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
            props: { detail: featchData },
        };
    } catch {
        return { notFound: true };
    }
}
export default TeamDetailPage;
