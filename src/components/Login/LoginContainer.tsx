import React, {useEffect, useState} from 'react';
import LoginComponent from './LoginComponent';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {login} from '../../redux/slices/auth';
import {LoginPass} from '../../types/types';
import {Alert} from 'antd';
import {Navigate} from 'react-router-dom';

export type returnFinishLogin = {
    username: string,
    password: string,
    remember: boolean
}

const LoginContainer: React.FC = () => {
    const [redirect, setRedirect] = useState(false);
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const status = useAppSelector(state => state.auth.status)

    const dispatch = useAppDispatch();
    const onFinish = async (values: returnFinishLogin) => {
        console.log('Received values of form: ', values);


        // const out: hash | string = await toHash(values.password)
        //
        // if (typeof out !== 'string') {
        //     const loginData: LoginPass = {
        //         username: values.username,
        //         password: out.hash,
        //     }
        //     console.log('pass', loginData.password)
        //     dispatch(login(loginData))
        // }
        const loginData: LoginPass = {
                username: values.username,
                password: values.password,
            }
            console.log('pass', loginData.password)
            dispatch(login(loginData))

    };
    // Если логин успешный и нет ошибок, то проверяем переменную isAuth, она становится тру
    // если авторизация прошла успешно, меняем флаг и происходит редирект
    useEffect(() => {
        if (isAuth) {
            setRedirect(true);
        }
    }, [isAuth])

    return (
        <>
            {status === 'failed' && <Alert
                message="Ошибка авторизации, попробуйте снова."
                type="warning"
                closable
                style={{marginBottom: '20px'}}
            />}
            {redirect && <Navigate to="/" replace={true}/>}
            <LoginComponent onFinish={onFinish}/>
        </>
    )
}

export default LoginContainer;