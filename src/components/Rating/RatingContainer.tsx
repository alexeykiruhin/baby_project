import React, {useEffect} from 'react'
import RatingComponent, {DataType} from './RatingComponent';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {fetchUsers} from '../../redux/slices/rating';

const RatingContainer = () => {
    // Ранжируем по рейтингу

    const users = useAppSelector(state => state.rating.users)

    const out = users?.map((user: any, index: number): DataType => {
        console.log(`user - ${user}`)
        return {key: index, username: user.username, rating: user.rating, subscribers: user.subscribers};
    })

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return <RatingComponent out={out}/>
}
export default RatingContainer
