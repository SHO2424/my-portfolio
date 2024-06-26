import AuthCard from '@/components/AuthCard';
import AuthSessionStatus from '@/components/AuthSessionStatus';
import Button from '@/components/Button';
import GuestLayout from '@/components/Layouts/GuestLayout';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Label from '@/components/Label';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';

const Login = () => {
    const router = useRouter();

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/home',
    });
    const [name, setName] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordError, setPasswordError] = useState(''); // ステップ1: エラーメッセージ用の状態を追加
    const [email, setEmail] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [shouldRemember, setShouldRemember] = useState(false);
    const [errors, setErrors] = useState([]);
    const [registerErrors, setRegisterErrors] = useState([]);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset));
        } else {
            setStatus(null);
        }
    });

    const submitForm = async event => {
        event.preventDefault();

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        });
    };

    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/home',
    });

    const submitFormRegister = event => {
        event.preventDefault();
        if (registerPassword !== passwordConfirmation) {
            // ステップ2: パスワードが一致するかチェック
            setPasswordError('Passwords do not match.'); // ステップ3: エラーメッセージを設定
            return; // 一致しない場合はここで処理を中断
        }
        if (registerPassword.length <= 7) {
            // パスワードの長さが7文字以下かチェック
            setPasswordError('Password must be at least 8 characters long.'); // エラーメッセージを設定
            return; // 処理を中断
        }
        register({
            name,
            email: registerEmail,
            password: registerPassword,
            password_confirmation: passwordConfirmation,
            setRegisterErrors,
        });
    };

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // コンポーネントがマウントされた時にアニメーションをトリガー
        setIsMounted(true);
        // setLoading(false);
    }, []);

    return (
        <GuestLayout>
            <AuthCard>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />
                <Box
                    sx={{
                        textAlign: 'center',
                        width: { xs: '60%', sm: '30%' },
                        margin: 'auto',
                    }}>
                    <Box>
                        <Typography
                            sx={{
                                color: 'rgb(45, 80, 129)',
                                fontWeight: 'bolder',
                                marginBottom: '45px',
                                paddingBottom: '5px',
                                fontSize: '25px',
                                borderBottom: '2px solid rgb(45, 80, 129)',
                            }}>
                            Already registered
                        </Typography>
                        {/* <ArrowDownwardIcon sx={{color:"white"}}/> */}
                    </Box>

                    <form
                        onSubmit={submitForm}
                        style={{
                            borderRadius: '1.5rem',
                            textAlign: 'center',
                            transition: 'opacity 2s, transform 2s',
                            boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.2)',
                            opacity: isMounted ? 1 : 0,
                            transform: isMounted
                                ? 'translateY(0)'
                                : 'translateY(40px)',
                        }}
                        className="w-full sm:max-w-md mt-6 px-6 py-4 bg-gray-100 shadow-md overflow-hidden sm:rounded-lg">
                        {/* Email Address */}
                        <div>
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                type="email"
                                value={email}
                                className="block mt-1 w-full"
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoFocus
                            />

                            <InputError
                                messages={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* Password */}
                        <div className="mt-4">
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                type="password"
                                value={password}
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                                required
                                autoComplete="current-password"
                            />

                            <InputError
                                messages={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Remember Me */}
                        <div
                            className="block mt-4"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                            }}>
                            <label
                                htmlFor="remember_me"
                                className="inline-flex items-center">
                                <input
                                    id="remember_me"
                                    type="checkbox"
                                    name="remember"
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={event =>
                                        setShouldRemember(event.target.checked)
                                    }
                                />

                                <span className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                href="/forgot-password"
                                className="underline text-sm text-gray-600 hover:text-gray-900 mt-4">
                                Forgot your password?
                            </Link>
                        </div>

                        <div className="flex items-center justify-center mt-8">
                            {/* <Button>
                            <Link href="/register">Not registered yet??</Link>
                        </Button> */}

                            <Button
                                className="ml-3"
                                style={{
                                    borderRadius: '30px',
                                }}>
                                Login
                            </Button>
                        </div>
                    </form>
                </Box>
                {/* </AuthCard> */}
                {/* </GuestLayout> */}
                {/* <GuestLayout> */}
                {/* <AuthCard> */}
                <Box
                    sx={{
                        textAlign: 'center',
                        width: { xs: '60%', sm: '30%' },
                        margin: 'auto',
                        paddingBottom: { xs: '30px', sm: '0px' },
                    }}>
                    <Box sx={{ marginTop: { xs: '30px', sm: '0px' } }}>
                        <Typography
                            sx={{
                                color: 'rgb(45, 80, 129)',

                                fontWeight: 'bolder',
                                marginBottom: '45px',
                                paddingBottom: '5px',
                                fontSize: '25px',
                                borderBottom: '2px solid rgb(45, 80, 129)',
                            }}>
                            Not registered yet
                        </Typography>
                        {/* <ArrowDownwardIcon sx={{color:"white" ,fontSize:"40px"}}/> */}
                    </Box>
                    <form
                        onSubmit={submitFormRegister}
                        style={{
                            borderRadius: '1.5rem',
                            textAlign: 'center',
                            transition: 'opacity 2s, transform 2s',
                            opacity: isMounted ? 1 : 0,
                            transform: isMounted
                                ? 'translateY(0)'
                                : 'translateY(40px)',
                            boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.2)',
                        }}
                        className="w-full  sm:max-w-md mt-6 px-6 py-4 bg-gray-100 shadow-md overflow-hidden sm:rounded-lg">
                        {/* Name */}
                        <div>
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                type="text"
                                value={name}
                                className="block mt-1 w-full"
                                onChange={event => setName(event.target.value)}
                                required
                                autoFocus
                            />

                            <InputError
                                messages={registerErrors.name}
                                className="mt-2"
                            />
                        </div>

                        {/* Email Address */}
                        <div className="mt-4">
                            <Label htmlFor="registerEmail">Email</Label>

                            <Input
                                id="registerEmail"
                                type="email"
                                value={registerEmail}
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setRegisterEmail(event.target.value)
                                }
                                required
                            />

                            <InputError
                                messages={registerErrors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* Password */}
                        <div className="mt-4">
                            <Label htmlFor="registerPassword">Password</Label>

                            <Input
                                id="registerPassword"
                                type="password"
                                value={registerPassword}
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setRegisterPassword(event.target.value)
                                }
                                required
                                autoComplete="new-password"
                            />

                            <InputError
                                messages={errors.registerPassword}
                                className="mt-2"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="mt-4">
                            <Label htmlFor="passwordConfirmation">
                                Confirm Password
                            </Label>

                            <Input
                                id="passwordConfirmation"
                                type="password"
                                value={passwordConfirmation}
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setPasswordConfirmation(event.target.value)
                                }
                                required
                            />

                            <InputError
                                messages={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                        {passwordError && (
                            <div className="text-red-500">{passwordError}</div>
                        )}
                        <div className="items-center mt-4">
                            {/* <Link
                        href="/login"
                        className="underline text-sm text-gray-600 hover:text-gray-900">
                        Already registered?
                    </Link> */}

                            <Button
                                className="ml-4"
                                style={{
                                    borderRadius: '30px',
                                }}>
                                Register
                            </Button>
                        </div>
                    </form>
                </Box>
            </AuthCard>
            {/* </Box> */}
        </GuestLayout>
    );
};

export default Login;
