import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {fetchPosts} from '../../redux/slices/home';
import PostListComponent from './PostListComponent';
import axios from 'axios';

const PostListContainer: React.FC = () => {
    const posts = useAppSelector(state => state.home.posts)
    const dispatch = useAppDispatch();
    useEffect(() => {
        // axios.get('/', {
        //             withCredentials: true,
        //             // headers: {'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`}
        //         }).then((response) => {
        //             console.log('api/time', response.data);
        //             return response.data
        //         })
        dispatch(fetchPosts());
    }, [dispatch])

    return <PostListComponent items={posts} width={600}/>
}

export default PostListContainer;