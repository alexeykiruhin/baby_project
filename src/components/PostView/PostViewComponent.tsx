import React from 'react'
import {Avatar, Card, Divider, Progress} from 'antd';
import {PostProps, sendScoreType} from '../../types/types';
import {NavLink} from 'react-router-dom';
import TagsViewComponent from '../TagsView/TagsViewComponent';
import {DislikeOutlined, LikeOutlined} from '@ant-design/icons';
import {changeRatingPost} from '../../redux/slices/home';
import {useAppDispatch} from '../../hooks/hooks';


const PostViewComponent = ({index, post}: PostProps) => {
    const dispatch = useAppDispatch();

    const sendScorePlus = () => {
        // console.log(post?.id)
        const ratingData: sendScoreType = {
            postId: post?.id,
            score: 1
        }
        dispatch(changeRatingPost(ratingData));
    }

    const sendScoreMinus = () => {
        const ratingData: sendScoreType = {
            postId: post?.id,
            score: 0
        }
        dispatch(changeRatingPost(ratingData));
    }

    return (
        <Card title={<NavLink to={'/rating'}>{post?.subject}</NavLink>}
              extra={<NavLink to={`/user/${post?.author.id}`}>
                  <Avatar src={post?.author.img}/><span> {post?.author.username}</span>
              </NavLink>}
              headStyle={{textAlign: 'left'}}
        >
            <p style={{marginBottom: '25px'}}>{post?.text}</p>
            {/*<Divider/>*/}
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
                ?<Progress strokeLinecap="butt" percent={post?.rating.result}/>
                :<Progress strokeLinecap="butt" strokeColor={'red'} percent={-1 * post?.rating.result}/>
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

    )
}
export default PostViewComponent