import React from 'react';
import LoginComponent from "./LoginComponent";
import {useAppDispatch} from '../../hooks/hooks';
import {login} from '../../redux/slices/auth';
import {LoginPass} from '../../types/types';

export type returnFinishLogin = {
    username: string,
    password: string,
    remember: boolean
}

const LoginContainer: React.FC = () => {

    const dispatch = useAppDispatch();
    const onFinish = (values: returnFinishLogin): void => {
        console.log('Received values of form: ', values);
        const loginData: LoginPass = {
            username: values.username,
            password: values.password
        }
        dispatch(login(loginData))
    };

    return <LoginComponent onFinish={onFinish}/>
}

export default LoginContainer;