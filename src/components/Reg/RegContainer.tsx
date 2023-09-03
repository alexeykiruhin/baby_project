import React from 'react';
import Reg from "./Reg";

export type returnFinishReg = {
    username: string,
    password: string,
    remember: boolean
}

const RegContainer: React.FC = () => {

    const onFinish = (values: returnFinishReg): void => {
        console.log('Received values of form: ', values);
    }

    return <Reg onFinish={onFinish}/>
}

export default RegContainer;