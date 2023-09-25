import React from 'react'
import {Avatar, Card, Divider, Progress, Image} from 'antd';
import {PostProps, sendScoreType} from '../../types/types';
import {NavLink} from 'react-router-dom';
import TagsViewComponent from '../TagsView/TagsViewComponent';
import {DislikeOutlined, LikeOutlined, SettingOutlined} from '@ant-design/icons';
import {changeRatingPost} from '../../redux/slices/home';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {changeUserRatingPost} from '../../redux/slices/user';
import {setIsEdited, setPostId} from '../../redux/slices/post';
import EditPostWithRedirect from '../EditPost/EditPostContainer';


const PostViewComponent = ({index, post, width}: PostProps) => {
    const dispatch = useAppDispatch();
    const isMe = useAppSelector(state => state.user.isMe)
    const isEdited = useAppSelector(state => state.post.isEdited)
    const sendScorePlus = () => {
        const ratingData: sendScoreType = {
            postId: post?.id,
            score: 1
        }
        dispatch(changeRatingPost(ratingData));
        dispatch(changeUserRatingPost(ratingData));
    }

    const handleSetIsEdited = (val: string) => {
        console.log(`POST ID - ${post.id}`)
        dispatch(setIsEdited(!isEdited))
        dispatch(setPostId(post.id))
    }

    const sendScoreMinus = () => {
        const ratingData: sendScoreType = {
            postId: post?.id,
            score: 0
        }
        dispatch(changeRatingPost(ratingData));
        dispatch(changeUserRatingPost(ratingData));
    }
    const url = 'http://127.0.0.1:5000/api/image/' + post.img
    return (
        <>
            {isEdited
                ? <EditPostWithRedirect />
                : <Card title={<NavLink to={'/rating'}>{post?.subject}</NavLink>}
                        extra={<NavLink to={`/user/${post?.author.id}`}>
                            {isMe && width === 200 // кастыль с шириной
                                ? <SettingOutlined onClick={()=>{handleSetIsEdited(post.id)}}/> // тут передавать айди
                                : <><Avatar src={post?.author.img}/><span> {post?.author.username}</span></>}
                            {/*<Avatar src={post?.author.img}/><span> {post?.author.username}</span>*/}
                        </NavLink>}
                        headStyle={{textAlign: 'left'}}
                        style={{maxWidth: '660px'}}
                >
                    {post.img &&
                        <>
                            <Image
                                width={width}
                                src={url}
                            />
                            <Divider/>
                        </>
                    }

                    <p style={{marginBottom: '25px'}}>{post?.text}</p>

                    <Divider/>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <LikeOutlined
                            style={{fontSize: '16px', cursor: 'pointer'}}
                            onMouseEnter={(e) => {
                                // Добавляем стили при наведении (например, изменение цвета)
                                e.currentTarget.style.color = '#1677ff'; // Замените на желаемый стиль
                            }}
                            onMouseLeave={(e) => {
                                // Убираем стили при уходе курсора
                                e.currentTarget.style.color = ''; // Возвращаем к стандартному стилю
                            }}
                            onClick={sendScorePlus}
                        />
                    </div>
                    {/*можно прогрессбар вынести в отдельный компонент*/}
                    {post.rating.result >= 0
                        ? <Progress strokeLinecap="butt" percent={post?.rating.result}/>
                        : <Progress strokeLinecap="butt" strokeColor={'red'} percent={-1 * post?.rating.result}/>
                    }
                    {/*<Progress strokeLinecap="butt" percent={post?.rating.result}/>*/}
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <DislikeOutlined
                            style={{fontSize: '16px', cursor: 'pointer'}}
                            onMouseEnter={(e) => {
                                // Добавляем стили при наведении (например, изменение цвета)
                                e.currentTarget.style.color = '#1677ff'; // Замените на желаемый стиль
                            }}
                            onMouseLeave={(e) => {
                                // Убираем стили при уходе курсора
                                e.currentTarget.style.color = ''; // Возвращаем к стандартному стилю
                            }}
                            onClick={sendScoreMinus}
                        />
                    </div>
                    <Divider/>
                    {/*<br/>*/}
                    <TagsViewComponent key={index} index={index} post={post}/>
                </Card>
            }
        </>
    )
}
export default PostViewComponent