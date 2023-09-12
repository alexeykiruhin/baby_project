import React from 'react'
import {Avatar, Card, Progress} from 'antd';
import {PostProps} from '../../types/types';
import {NavLink} from 'react-router-dom';
import TagsViewComponent from '../TagsView/TagsViewComponent';
import {MinusSquareOutlined, PlusSquareOutlined} from '@ant-design/icons';


const PostViewComponent = ({index, post}: PostProps) => {
    return (
        <Card title={<NavLink to={'/rating'}>{post?.subject}</NavLink>}
              extra={<NavLink to={'/create'}><Avatar
                  src={post?.author.img}/><span> {post?.author.username}</span></NavLink>}
              style={{width: '70vw'}}>
            <p style={{marginBottom: '25px'}}>{post?.text}</p>
            {/*<Divider/>*/}
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <NavLink to={'/rating'}>
                    <PlusSquareOutlined />
                </NavLink>
            </div>
            <Progress strokeLinecap="butt" percent={post?.rating.result}/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <NavLink to={'/rating'}>
                    <MinusSquareOutlined/>
                </NavLink>
            </div>
            <TagsViewComponent key={index} index={index} post={post}/>
        </Card>

    )
}
export default PostViewComponent