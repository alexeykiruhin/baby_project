import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import UserViewComponent from './UserViewComponent';
import {fetchUser, unsubscribed} from '../../redux/slices/user';
import {useParams} from 'react-router-dom';
import {subscribed} from '../../redux/slices/user';

const UserViewContainer: React.FC = () => {
    const posts = useAppSelector(state => state.user.posts)
    const userInfo = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const paramUserId = useParams();
    useEffect(() => {
        console.log('all')
        dispatch(fetchUser(paramUserId.userId));
    }, [dispatch, paramUserId.userId])

    const subscribe = (userId: string | null) => {
        console.log(userId)
        dispatch(subscribed(userId))
    }
    const unsubscribe = (userId: string | null) => {
        console.log(userId)
        dispatch(unsubscribed(userId))
    }

    return <UserViewComponent items={posts} subscribe={subscribe} unsubscribe={unsubscribe} {...userInfo}/>
}

export default UserViewContainer;