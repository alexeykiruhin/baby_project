import React from 'react'
import {Avatar, Card, Divider, Image, Flex, Popover} from 'antd';
import {PostProps, sendScoreType} from '../../types/types';
import {NavLink} from 'react-router-dom';
import TagsViewComponent from '../TagsView/TagsViewComponent';
import {CommentOutlined, DeleteOutlined, DislikeOutlined, LikeOutlined, SettingOutlined} from '@ant-design/icons';
import {changeRatingPost} from '../../redux/slices/home';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {editPostList, setPostId} from '../../redux/slices/user';
import {delPost, setIsEdited} from '../../redux/slices/post';
import EditPostWithRedirect from '../EditPost/EditPostContainer';
import RatingPostViewComponent from "./RatingPostViewComponent";


const PostViewComponent = ({post, flagSettings, flagView}: PostProps) => {
    const dispatch = useAppDispatch();
    const isMe = useAppSelector(state => state.user.isMe)
    const isEdited = useAppSelector(state => state.post.isEdited)
    let widthImg: number = 200
    if (flagView === 'single') {
        widthImg = 600
    }
    const sendScorePlus = () => {
        const ratingData: sendScoreType = {
            postId: post?.id,
            score: 1
        }
        dispatch(changeRatingPost(ratingData));
        // dispatch(changeUserRatingPost(ratingData));
    }

    const handleSetIsEdited = () => {
        console.log(`POST ID - ${post?.rating.result}`)
        // вывести оповещение о том что у поста рейтинг уже не ноль и его нельзя редактировать
        if (post?.rating.result === 0){
            dispatch(setPostId(post?.id))
            dispatch(setIsEdited(!isEdited))
        }
    }

    // Удаление поста
    const handleDelete = () => {
        if (post?.id !== undefined) {
            console.log('post?.id', post?.id)
            dispatch(delPost(post?.id))
            dispatch(editPostList(post?.id))
        }
    }

    const sendScoreMinus = () => {
        const ratingData: sendScoreType = {
            postId: post?.id,
            score: 0
        }
        dispatch(changeRatingPost(ratingData));
        // dispatch(changeUserRatingPost(ratingData));
    }
    //надо импортировать урл
    const url = 'http://127.0.0.1:5000/api/image/' + post?.img

    const content = (
        <div>
            <p>Name - {post?.author.username}</p>
            <p>Status - {post?.author.statusText}</p>
        </div>
    );

    return (
        <>
            {isEdited
                ? <EditPostWithRedirect/>
                : <Card title={<NavLink to={'/post/' + post?.id}>{post?.subject}</NavLink>}
                        extra={
                            post && post.author && post.author.id
                                ? ( // проверка на существование post без нее получаю ошибку
                                    <>
                                        <NavLink to={`/user/${post?.author.id}`}>
                                            {isMe && flagSettings === 'settings' && post.rating.result === 0
                                                // проверка мои ли посты, флаг сеттингс и нулевой рейтинг
                                                ? <>
                                                    <SettingOutlined onClick={handleSetIsEdited}/>
                                                    <DeleteOutlined style={{marginLeft: '10px'}} onClick={handleDelete}/>
                                                </>
                                                : <>
                                                    <Popover content={content}>
                                                        <Avatar src={post?.author.img} shape="square"/>
                                                    </Popover>
                                                    {/*<span> {post?.author.username}</span>*/}
                                                </>
                                            }
                                        </NavLink>
                                    </>)
                                : null}
                        styles={{header: {'textAlign': 'left'}}}
                    // headStyle={{textAlign: 'left'}}
                        style={{maxWidth: '660px'}}
                >
                    {/*вставляем картинку если она есть у поста*/}
                    {post?.img &&
                        <Flex vertical={true} align={'center'}>
                            <Image
                                style={{alignItems: 'center'}}
                                width={widthImg} // ширина изображения в посте
                                src={url}
                            />
                            <Divider style={{color: '#000'}}/>
                        </Flex>
                    }

                    {/*текст поста*/}
                    <p style={{marginBottom: '25px'}}>
                        {/*//сокращаем текст до 200 знаков*/}
                        {post && post?.text.length > 199 ? post?.text.substring(0, 199) + '...' : post?.text}
                    </p>


                    {/*блок лайков и дизлайков*/}
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
                    {post && <RatingPostViewComponent result={post.rating.result}/>}

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
                    <Flex justify={'space-between'}>
                        {/*компонент тегов*/}
                        <TagsViewComponent post={post}/>
                        {/*иконка комментариев*/}
                        <NavLink to={'/post/' + post?.id}>
                            <CommentOutlined
                                style={{fontSize: '22px', cursor: 'pointer', color: '#1677ff'}} // костыль на отступ
                            />
                        </NavLink>
                    </Flex>

                </Card>
            }
        </>
    )
}
export default PostViewComponent