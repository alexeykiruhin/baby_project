import React from 'react'
import {NavLink} from 'react-router-dom';
import {PostProps, TagType} from '../../types/types';
import {Tag} from 'antd';

const TagsViewComponent = ({post}: PostProps) => {
    return (
        post && post.tags ? (
            <>
                {post?.tags.map((tag: TagType, index: number) => {
                    return (
                        <NavLink key={index} to={'/rating'}>
                            <Tag>
                                {tag.tag_name}
                            </Tag>
                        </NavLink>
                    )
                })}
            </>
        ) : null
    )
}
export default TagsViewComponent
