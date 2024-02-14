import React from "react";
import {useAppSelector} from '../hooks/hooks';

import {Navigate} from "react-router-dom";
import Preloader from "../components/common/Preloader/Preloader";

export const withAuthRedirect = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    const AuthRedirect: React.FC<P> = (props) => {
        const isAuth = useAppSelector(state => state.auth.isAuth);
        const status = useAppSelector(state => state.auth.status);
        console.log('isAuth', isAuth)
        console.log('status', status)
        // const isAuth = useAppSelector(state => state.auth.isAuth);
        //проверяю статус запроса isAuth, если не готов ответ, то возвращаем прелоадер
        if (status === 'succeeded') {
            if (!isAuth) {
                return <Navigate to="/login" replace={true}/>;
            }
            return <WrappedComponent {...props} />;
        } else if (status === 'failed') { // если не залогинен то редиректим на логин
            return <Navigate to="/login" replace={true}/>;
        }
        return <Preloader />
    };

    return AuthRedirect;
};
