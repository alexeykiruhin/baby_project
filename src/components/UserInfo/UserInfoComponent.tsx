import React, {useEffect, useState} from 'react';
import {Avatar, Button} from 'antd';
import styles from './UserInfo.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {NavLink} from 'react-router-dom';
import {checkAuth} from '../../redux/slices/auth';

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];

const UserInfoComponent: React.FC = () => {
    const [user, setUser] = useState(UserList[0]);
    const [color, setColor] = useState(ColorList[0]);
    const [gap, setGap] = useState(GapList[0]);

    const changeUser = () => {
        const index = UserList.indexOf(user);
        setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
        setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
    };

    const changeGap = () => {
        const index = GapList.indexOf(gap);
        setGap(index < GapList.length - 1 ? GapList[index + 1] : GapList[0]);
    };

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch])

    return (
        <div className={styles.UserInfo}>
            {
                isAuth ? <>
                        <Avatar style={{backgroundColor: color, verticalAlign: 'middle'}} size="large" gap={gap}>
                            {user}
                        </Avatar>
                        <Button
                            size="small"
                            style={{margin: '0 16px', verticalAlign: 'middle'}}
                            onClick={changeUser}
                        >
                            ChangeUser
                        </Button>
                        <Button size="small" style={{verticalAlign: 'middle'}} onClick={changeGap}>
                            changeGap
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
