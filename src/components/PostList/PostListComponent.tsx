import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {fetchPosts} from '../../redux/slices/home';
import PostViewComponent from '../PostView/PostViewComponent';
import {FloatButton, Space} from 'antd';

const PostListComponent: React.FC = () => {
    const posts = useAppSelector(state => state.home.posts)
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log('all')
        dispatch(fetchPosts());
    }, [dispatch])
    return (
        <Space direction="vertical" size="middle" style={{display: 'flex'}}>
            {posts?.map((post, index) => <PostViewComponent key={index} index={index} post={post}/>)}
            <FloatButton.BackTop visibilityHeight={300}/>
        </Space>
    )
}

export default PostListComponent;