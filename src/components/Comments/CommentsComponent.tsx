import React from "react";
import {Avatar, Card, Button} from 'antd';
import {CommentsProps} from "../../types/types";
import {NavLink} from "react-router-dom";

const CommentsComponent: React.FC<CommentsProps> = ({comment, myUserId, handleToggleEdit}) => {

    return (
        <>
            <Card
                title={comment?.author.id &&
                    <NavLink to={`/user/${comment?.author.id}`}>
                        <Avatar src={comment?.author.img}/>
                        <span> {comment?.author.username}</span>
                    </NavLink>
                }
                extra={myUserId && myUserId === comment?.author.id
                    ? <Button
                        type="link"
                        style={{width: '65px'}}
                        onClick={() => handleToggleEdit ? handleToggleEdit(comment?.id) : null}
                    >Edit</Button>
                    : <Button
                        type="link"
                        style={{width: '65px'}}
                    >More</Button>} // флаг на переключение вью на редактирование
                style={{marginTop: '10px'}}
            >
                <p>{comment?.text}</p>
            </Card>
        </>
    )
}

export default CommentsComponent