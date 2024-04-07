import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import  AppLayout  from '@/components/Layouts/AppLayout';
import { Grid, Box } from '@mui/material';
import Button from '@/components/Button';

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' });

    return (
        <>
            <AppLayout>
                
                        <Box sx={{height:"100vh"}}>  
                        <Box sx={{display:"flex",justifyContent:"center" ,alignItems: 'center',height:"100%"}} >
                            <Button>
                            <Link
                                href="/login"
                                className="text-sm text-white-700">
                                Login
                            </Link>

                            </Button>
                            <Button style={{marginLeft:"10px"}}>
                            <Link
                                href="/register"
                                className="text-sm text-white-700">
                                Register
                            </Link>
                            </Button>
                            </Box>
                        </Box>
             
            
            </AppLayout>

             
        </>
    );
}
