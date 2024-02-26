import {Avatar, Button, Card} from "antd";
import {NavLink} from "react-router-dom";
import React, {useState} from "react";
import {CommentsProps} from "../../../types/types";
import {Input} from 'antd';

const {TextArea} = Input;
const EditCommentComponent: React.FC<CommentsProps> = ({comment, handleToggleEdit, saveEditComment}) => {
    const [text, setText] = useState(comment?.text)

    return (
        <>
            <Card
                title={comment?.author.id &&
                    <NavLink to={`/user/${comment?.author.id}`}>
                        <Avatar src={comment?.author.img}/>
                        <span> {comment?.author.username}</span>
                    </NavLink>
                }
                extra={
                    comment && text ? <>
                        <Button
                            type="link"
                            style={{width: '65px'}}
                            onClick={() => saveEditComment ? saveEditComment(text, comment?.id) : null}
                        >Save</Button>
                        <Button
                            type="link"
                            style={{width: '65px'}}
                            danger={true}
                            onClick={() => handleToggleEdit ? handleToggleEdit('') : null}
                        >Cancel</Button>
                    </> : null
                } // флаг на переключение вью на редактирование
                style={{marginTop: '10px'}}
            >
                <TextArea rows={4} value={text} onChange={(e) => setText(e.currentTarget.value)}/>
            </Card>
        </>
    )
}

export default EditCommentComponent