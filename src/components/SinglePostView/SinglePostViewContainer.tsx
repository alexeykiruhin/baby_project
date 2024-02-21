import React, {useEffect, useRef} from "react";
import {getPost} from "../../redux/slices/post";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useParams} from "react-router-dom";
import PostViewComponent from "../PostView/PostViewComponent";
import {Typography} from 'antd';
import CommentsContainer from "../Comments/CommentsContainer";

const {Title} = Typography;

const SinglePostViewContainer: React.FC = () => {
    const post = useAppSelector((state) => state.post.post)
    const dispatch = useAppDispatch()
    const paramPostId = useParams();
    const commentsRef = useRef<HTMLHeadingElement>(null); // Создание ref

    console.log('paramPostId', paramPostId.postId)
    useEffect(() => {
        dispatch(getPost(paramPostId))
    }, [dispatch, paramPostId]);

    useEffect(() => {
        commentsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);
    return (
        <div
            style={{display: 'flex', marginTop: '73px', flexDirection: 'column', alignItems: 'center'}}
        >
            <div
                style={{width: '660px'}}
            >
                {/*попробовать заменить Space на обычный див и его настроить так как надо*/}
                {/*есть отступ сверху, можно его чем то заполнить*/}
                <PostViewComponent post={post} flagView={'single'}/>
                <Title level={2} style={{textAlign: 'center', marginBottom: '0.83em'}} ref={commentsRef}>Comments</Title>
                <CommentsContainer postId={paramPostId.postId}/>
            </div>
        </div>
    )
}

export default SinglePostViewContainer