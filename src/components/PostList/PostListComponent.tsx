import React from 'react';
import PostViewComponent from '../PostView/PostViewComponent';
import {FloatButton, Space} from 'antd';
import {PostListComponentPropsType} from '../../types/types';

const PostListComponent: React.FC<PostListComponentPropsType> = ({items, flagSettings}) => {

    return (
        <Space direction="vertical" size="small" style={{display: 'flex', background: 'red'}}>
            {items.map((item, index) => <PostViewComponent
                key={index} index={index} post={item} flagSettings={flagSettings} flagView={'list'}/>)}
            <FloatButton.BackTop visibilityHeight={300}/>
        </Space>
    )
}

export default PostListComponent;