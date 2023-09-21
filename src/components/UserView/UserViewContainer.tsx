import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import UserViewComponent from './UserViewComponent';
import {editStatusText, fetchUser, unsubscribed} from '../../redux/slices/user';
import {useParams} from 'react-router-dom';
import {subscribed} from '../../redux/slices/user';

const UserViewContainer: React.FC = () => {
    const posts = useAppSelector(state => state.user.posts)
    const userInfo = useAppSelector(state => state.user)

    const [isEdit, updateIsEdit] = useState(false);

    const dispatch = useAppDispatch();
    const paramUserId = useParams();

    const [newText, editNewText] = useState(userInfo.statusText)

    useEffect(() => {
        dispatch(fetchUser(paramUserId.userId));
    }, [dispatch, paramUserId.userId])

    const subscribe = (userId: string | null) => {
        dispatch(subscribed(userId))
    }
    const unsubscribe = (userId: string | null) => {
        dispatch(unsubscribed(userId))
    }

    const editStatus = (text: string | null) => {
        // dispatch()
        console.log('STSTUS')
        updateIsEdit(false)
        const uid = paramUserId.userId
        dispatch(editStatusText({uid, text}))
    }

    return <UserViewComponent
        items={posts}
        subscribe={subscribe}
        unsubscribe={unsubscribe}
        editStatus={editStatus}
        isEdit={isEdit}
        {...userInfo}
        updateIsEdit={updateIsEdit}
        newText={newText}
        editNewText={editNewText}
    />
}

export default UserViewContainer;