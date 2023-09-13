import React, {useEffect} from 'react';
import {Avatar, Button} from 'antd';
import styles from './UserInfo.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {NavLink} from 'react-router-dom';
import {checkAuth, logout} from '../../redux/slices/auth';


const UserInfoComponent: React.FC = () => {

    const info = () => {
        console.log('Info')
    };

    const exit = () => {
        console.log('Logout')
        dispatch(logout());
    };

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const img = useAppSelector(state => state.auth.img)
    const id = useAppSelector(state => state.auth.id)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch])

    return (
        <div className={styles.UserInfo}>
            {
                isAuth
                    ? <>
                        <Avatar src={img} size="large"></Avatar>
                        <NavLink to={`/user/${id}`}>
                            <Button
                                size="small"
                                style={{margin: '0 16px', verticalAlign: 'middle'}}
                                onClick={info}
                            >
                                Info
                            </Button>
                        </NavLink>
                        <Button size="small" style={{verticalAlign: 'middle'}} onClick={exit}>
                            Logout
                        </Button>
                    </>
                    : <NavLink to={'/login'}>
                        <Button size={'middle'}>Login</Button>
                    </NavLink>
            }
        </div>
    );
};

export default UserInfoComponent;
