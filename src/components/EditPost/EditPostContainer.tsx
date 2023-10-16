import React, {useEffect} from 'react';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import EditPostComponent from './EditPostComponent';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {editPost, getPost, getTags, setIsEdited} from '../../redux/slices/post';
import {PostDataType} from '../../types/types';
import {UploadFile} from 'antd/es/upload/interface';


const EditPostContainer: React.FC = () => {
    // Контейнер для редактирования поста

    const dispatch = useAppDispatch()
    const postId = useAppSelector(state => state.post.postId)
    // const post = useAppSelector(state => {
    //     return state.user.posts.filter((post) => post.id === postId)
    // })[0]
    const post = useAppSelector(state => state.post.post)
    // Флаг для отображения списка постов или редактора поста
    const isEdited = useAppSelector(state => state.post.isEdited)

    // Файлы прикрепленные к посту
    const fileList: UploadFile[] = [
        {
            uid: '-1',
            name: post?.img || '',
            status: 'done',
            url: 'http://127.0.0.1:5000/api/image/' + post?.img,
            // thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ];

    useEffect(() => {
        dispatch(getTags())
        // dispatch(getPost({postId}))
        console.log('deispatch postId == undefined', postId)
        if (postId !== undefined) {
            console.log('deispatch postId !== undefined', postId)
            // получаем пост
            dispatch(getPost({postId}))
        }
    }, [dispatch, postId, isEdited])

    // переменные для тегов и файлов
    let tags = ''
    let file = ''

    // Загрузка изображения на сервер
    const onUpload = (name: string) => {
        file = name
    };
    // Устанока новых тегов
    const setTags = (value: string) => {
        tags = value
    }

    // Отправка изменений
    const onFinish = (value: any) => {

        const out: PostDataType = {
            title: value.subject,
            text: value.text,
            file: file || post?.img, // Поле "файл" может быть строкой или null, если файл отсутствует
            tags: tags || value.tags,
            id: post?.id
        }

        dispatch(editPost(out))
        dispatch(setIsEdited(false))
        console.log(`finish - ${value}`)
    }

    //Отмена изменений
    const onCancel = () => {
        dispatch(setIsEdited(false))
    }

    return (
        <>
            {post?.id === '' && <div>LOLO</div>}
            {post !== undefined && post?.id !== '' && <EditPostComponent
                post={post}
                onUpload={onUpload}
                onFinish={onFinish}
                onCancel={onCancel}
                fileList={fileList}
                setTags={setTags}
            />}
        </>
    )
}

const EditPostWithRedirect = withAuthRedirect(EditPostContainer)

export default EditPostWithRedirect;
