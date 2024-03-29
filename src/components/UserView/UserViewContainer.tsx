import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import UserViewComponent from './UserViewComponent';
import {editStatusText, fetchUser, unsubscribed} from '../../redux/slices/user';
import {useParams} from 'react-router-dom';
import {subscribed} from '../../redux/slices/user';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

const UserViewContainer: React.FC = () => {
    const posts = useAppSelector(state => state.user.posts)
    const isEdited = useAppSelector(state => state.post.isEdited)
    const userInfo = useAppSelector(state => state.user)
    // Флаг для изменения статуса
    const [isEdit, updateIsEdit] = useState(false);

    const dispatch = useAppDispatch();
    const paramUserId = useParams();

    const [newText, editNewText] = useState(userInfo.statusText)

    useEffect(() => {
        dispatch(fetchUser(paramUserId.userId));
    }, [dispatch, paramUserId.userId, isEdited])

    const subscribe = (userId: string | null) => {
        dispatch(subscribed(userId))
    }
    const unsubscribe = (userId: string | null) => {
        dispatch(unsubscribed(userId))
    }

    const editStatus = (text: string | null) => {
        // dispatch()
        console.log('STATUS')
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
        isEdited={isEdited}
    />
}
const UserViewWithRedirect = withAuthRedirect(UserViewContainer)

export default UserViewWithRedirect;
// export default UserViewContainer;