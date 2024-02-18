import React from "react";
import {Avatar, Card} from 'antd';
import {CommentsProps} from "../../types/types";
import {NavLink} from "react-router-dom";

const CommentsComponent: React.FC<CommentsProps> = ({comment}) => {
    return (
        <>
            <Card
                title={comment?.author.id &&
                    <NavLink to={`/user/${comment?.author.id}`}>
                        <Avatar src={comment?.author.img}/>
                        <span> {comment?.author.username}</span>
                    </NavLink>
                }
                extra={'More'}
                style={{marginTop: '10px'}}
            >
                <p>{comment?.text}</p>
            </Card>
        </>
    )
}

export default CommentsComponent