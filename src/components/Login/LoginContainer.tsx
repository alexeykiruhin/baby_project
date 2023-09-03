import React from 'react';
import Login from "./Login";

export type returnFinishLogin = {
    username: string,
    password: string,
    remember: boolean
}

const LoginContainer: React.FC = () => {

    const onFinish = (values: returnFinishLogin): void => {
        console.log('Received values of form: ', values);
    };

    return <Login onFinish={onFinish}/>
}

export default LoginContainer;