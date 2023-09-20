import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import UserViewComponent from './UserViewComponent';
import {fetchUser} from '../../redux/slices/user';
import {useParams} from 'react-router-dom';

const UserViewContainer: React.FC = () => {
    const posts = useAppSelector(state => state.user.posts)
    const userInfo = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const paramUserId = useParams();
    useEffect(() => {
        console.log('all')
        dispatch(fetchUser(paramUserId.userId));
    }, [dispatch, paramUserId.userId])

    return <UserViewComponent items={posts} {...userInfo}/>
}

export default UserViewContainer;