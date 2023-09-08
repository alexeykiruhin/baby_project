import React from 'react';
import LoginComponent from "./LoginComponent";

export type returnFinishLogin = {
    username: string,
    password: string,
    remember: boolean
}

const LoginContainer: React.FC = () => {

    const onFinish = (values: returnFinishLogin): void => {
        console.log('Received values of form: ', values);
    };

    return <LoginComponent onFinish={onFinish}/>
}

export default LoginContainer;