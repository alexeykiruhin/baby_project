import CommentsComponent from "./CommentsComponent";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Button} from "antd";
import CreateCommentForm from "./CreateCommentForm";
import {CommentDataType, PostIdType} from "../../types/types";
import {createComment, editComment, toggleEditComment} from "../../redux/slices/comments";
import {getCommentsByPostId} from "../../redux/slices/comments";
import EditCommentContainer from "./EditComment/EditCommentContainer";

const CommentsContainer: React.FC<PostIdType> = (postId) => {
    const comments = useAppSelector((state) => state.comments.comments)
    const [isAddComment, AddComment] = useState(false)
    const dispatch = useAppDispatch()
    const myUserId = useAppSelector((state) => state.auth.id)
    const [isEditComment, EditComment] = useState('')
    let file: string = ''


    useEffect(() => {
        dispatch(getCommentsByPostId(postId))
    }, [dispatch, postId, isEditComment]);

    const handleCreateComment = () => {
        console.log('add comment')
        AddComment(true)
    }

    const onFinish = (values: any) => {
        const commentData: CommentDataType = {
            post_id: postId.postId,
            text: values,
            file: file,
        }
        dispatch(createComment(commentData))
    }

    const onUpload = (name: string) => {
        console.log('name:', name);
        file = name
    };

    const handleToggleEdit = (id: string) => {
        console.log(id)
        EditComment(id)
        // dispatch(toggleEditComment())
    }

    const saveEditComment = (text: string, id: string) => {
        const commentData: CommentDataType = {
            comment_id: id,
            post_id: postId.postId,
            text: text,
            file: file,
        }
        dispatch(editComment(commentData))
        EditComment('')
        // dispatch(toggleEditComment())
    }

    return <>
        {comments && myUserId ? comments.map((comment, index) => {
            if (comment.id === isEditComment) {
                console.log('=====')
                return (
                    <EditCommentContainer
                        comment={comment}
                        handleToggleEdit={handleToggleEdit}
                        saveEditComment={saveEditComment}
                    />)
            } else {
                return (
                    <CommentsComponent
                        comment={comment}
                        myUserId={myUserId}
                        handleToggleEdit={handleToggleEdit}
                    />)
            }
        }) : null}
        {isAddComment && <CreateCommentForm onFinish={onFinish} onUpload={onUpload} AddComment={AddComment}/>}
        {!isAddComment && <Button
            block
            style={{background: '#001529', marginTop: '20px', color: '#FFF'}}
            onClick={handleCreateComment}
        >
            Add comment
        </Button>}
    </>
}

export default CommentsContainer