import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {fetchPosts} from '../../redux/slices/home';
import PostListComponent from './PostListComponent';

const PostListContainer: React.FC = () => {
    const posts = useAppSelector(state => state.home.posts)
    const dispatch = useAppDispatch();
    const flagSettings: string = 'view'
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

    return <PostListComponent items={posts} flagSettings={flagSettings}/>
}

export default PostListContainer;