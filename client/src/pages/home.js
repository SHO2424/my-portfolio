import AppLayout from '@/components/Layouts/AppLayout'
import { CardContent, Grid } from '@mui/material'

import 'swiper/css';
import { Box} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/Link';
import Layout from '@/components/Layouts/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ConstructionOutlined } from '@mui/icons-material';
import { display } from '@mui/system';

import SearchBar from "../components/SearchBar"


const First = () => {
  const AnimatedGridItem = ({link,img}) => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      // コンポーネントがマウントされた時にアニメーションをトリガー
      setIsMounted(true);
        setLoading(false);
    }, []);
    return(
      <Grid item xs={4} 
      sx={{ 
        textAlign: 'center',
        opacity: 0,
        transform: 'translateY(40px)',
        transition: 'opacity 2s, transform 2s',
        opacity: isMounted ? 1 : 0, transform: isMounted ? 'translateY(0)' : 'translateY(40px)'
       }}>
           <Box sx={{display:"flex" ,justifyContent:"center",height:"100%",width:"100%"}}>
            <Link href={link}>
            <Layout image={img}/>
            </Link>
           </Box>
    </Grid>
    )
  }
  // データを格納するための状態
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  // Rapid APIエンドポイント
//   const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3/leagues';

  useEffect(() => {
        setLoading(false);
  },[]);
  
  // ローディング中の表示
  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    
<AppLayout >
  <SearchBar sx={{paddingTop:"40px"}}/>
  <Box sx={{height:"100%",display:"flex",alignItems:"center"}}>
<Grid container alignItems="center" spacing={4} 
    sx={{
        height:{xs:"75vh",sm:"88vh",md:"125vh"},
        px: "20px", // X 軸（左右）のパディングを 20px に設定
        py: "50px", // Y 軸（上下）のパディングを 50px に設定
         display:"flex",
         justifyContent:"center"
      }}>
      <AnimatedGridItem
      link={"detail/England/39"}
      img={"Premier_logo.png"}
      />
      <AnimatedGridItem
      link={"detail/Spain/140"}
      img={"Laliga_log2.jpeg"}
      />
      <AnimatedGridItem
      link={"detail/Italy/135"}
      img={"SerieA_logo.webp"}
      />
      <AnimatedGridItem
      link={"detail/France/61"}
      img={"Ligue1_logo.webp"}
      />
      <AnimatedGridItem
      link={"detail/Germany/78"}
      img={"Bundesliga_logo.jpeg"}
      />
  </Grid>
  </Box>
  </AppLayout>        
  )

}


export default First