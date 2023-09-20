import React from 'react';
import PostViewComponent from '../PostView/PostViewComponent';
import {FloatButton, Space} from 'antd';
import {PostListComponentPropsType} from '../../types/types';

const PostListComponent: React.FC<PostListComponentPropsType> = ({items}) => {

    return (
        <Space direction="vertical" size="middle" style={{display: 'flex'}}>
            {items.map((item, index) => <PostViewComponent key={index} index={index} post={item}/>)}
            <FloatButton.BackTop visibilityHeight={300}/>
        </Space>
    )
}

export default PostListComponent;