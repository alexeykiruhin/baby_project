import React from 'react'
import {Avatar, Card, Divider} from 'antd';
import {PostProps} from '../../types/types';
import {NavLink} from 'react-router-dom';
import TagsViewComponent from '../TagsView/TagsViewComponent';


const PostViewComponent = ({index, post}: PostProps) => {
    return (
        <Card title={<NavLink to={'/rating'}>{post?.subject}</NavLink>}
              extra={<NavLink to={'/create'}><Avatar src={post?.author.img}/><span> {post?.author.username}</span></NavLink>}
              style={{width: 600}}>
            <p>{post?.text}</p>
            <Divider/>
            <TagsViewComponent key={index} index={index} post={post}/>
        </Card>

    )
}
export default PostViewComponent