import { useRouter } from 'next/router'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Box, Typography } from '@mui/material'

const BackButton = () => {
    const router = useRouter()
    return (
        <button onClick={() => router.back()}>
            <Box display="flex" alignItems="center">
                <ArrowBackIosIcon
                    style={{ color: 'white', fontSize: 25, marginRight: 2 }}
                />
                <Typography variant="body1" sx={{ color: 'white' }}>
                    戻る
                </Typography>
            </Box>
        </button>
    )
}
export default BackButton
