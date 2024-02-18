import CommentsComponent from "./CommentsComponent";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Button} from "antd";
import CreateCommentForm from "./CreateCommentForm";
import {CommentDataType, PostIdType} from "../../types/types";
import {createComment} from "../../redux/slices/comment";
import {getCommentsById} from "../../redux/slices/comments";

const CommentsContainer: React.FC<PostIdType> = (postId) => {
    const comments = useAppSelector((state) => state.comments.comments)
    const [isAddComment, AddComment] = useState(false)
    const dispatch = useAppDispatch()
    let file: string = ''


    useEffect(() => {
        dispatch(getCommentsById(postId))
    }, [dispatch, postId]);

    const handleCreateComment = () => {
        console.log('add comment')
        AddComment(true)
    }

    const onFinish = (values: any) => {
        const commentData: CommentDataType = {
            post_id: postId.postId,
            text: values.Text,
            file: file,
        }
        dispatch(createComment(commentData))
    }

    const onUpload = (name: string) => {
        console.log('name:', name);
        file = name
    };

    console.log(comments)

    return <>
        {comments.map((comment, index) => <CommentsComponent comment={comment}/>)}
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