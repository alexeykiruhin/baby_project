import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {fetchPosts} from '../../redux/slices/home';
import PostViewComponent from '../PostView/PostViewComponent';
import { Space } from 'antd';

const PostListComponent: React.FC = () => {
    const posts = useAppSelector(state => state.home.posts)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            {posts?.map((post, index) => <PostViewComponent key={index} index={index} post={post}/>)}
        </Space>
    )
}

export default PostListComponent;