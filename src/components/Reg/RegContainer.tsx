import React from 'react';
import Reg from './RegComponent';
import {returnFinishReg} from '../../types/types';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {register} from '../../redux/slices/auth';
import {Navigate} from 'react-router-dom';


// email: 'as@sd.ru', password: 'sd', confirm: 'sd', nickname: 'sd', agreement: true

const RegContainer: React.FC = () => {
    const dispatch = useAppDispatch()
    const isReg = useAppSelector(state => state.auth.isReg)

    const onFinish = async (values: returnFinishReg) => {
        // const out: hash | string = await toHash(values.password)
        //
        // if (typeof out !== 'string') {
        //     values.password = out.hash
        //     dispatch(register(values))
        // }
        dispatch(register(values))
    }


    return (
        <>
            {isReg ? <Navigate to="/login" replace={true}/> : <Reg onFinish={onFinish}/>}
        </>
    )
}

export default RegContainer;