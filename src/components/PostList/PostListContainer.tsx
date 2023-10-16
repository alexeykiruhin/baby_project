import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {fetchPosts} from '../../redux/slices/home';
import PostListComponent from './PostListComponent';

const PostListContainer: React.FC = () => {
    const posts = useAppSelector(state => state.home.posts)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])

    return <PostListComponent items={posts} width={600}/>
}

export default PostListContainer;