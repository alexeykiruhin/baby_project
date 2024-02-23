import React, {useEffect} from 'react';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import EditPostComponent from './EditPostComponent';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {getTags, setIsEdited} from '../../redux/slices/post';
import {HomePostType} from '../../types/types';
import {UploadFile} from 'antd/es/upload/interface';
import {editPost} from "../../redux/slices/user";


const EditPostContainer: React.FC = () => {
    // Контейнер для редактирования поста

    const dispatch = useAppDispatch()
    const currentPost = useAppSelector((state) => state.user.currentPost)
    const ediTpost = useAppSelector((state) => state.user.posts.filter((p) => p.id === currentPost))
    const post = ediTpost[0]
    console.log(post)
    // Флаг для отображения списка постов или редактора поста
    const isEdited = useAppSelector(state => state.post.isEdited)

    // Файлы прикрепленные к посту
    const fileList: UploadFile[] = [
        {
            uid: '-1',
            name: post.img || '',
            status: 'done',
            url: 'http://127.0.0.1:5000/api/image/' + post?.img,
            // thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ];

    useEffect(() => {
        //получаю все теги, что бы при редактировании можно было выбирать готовые
        dispatch(getTags())
    }, [dispatch, isEdited, post])

    // переменные для тегов и файлов
    let tags = ''
    let file = ''

    // Загрузка изображения на сервер
    const onUpload = (name: string) => {
        file = name
    };
    // Устанока новых тегов
    const setTags = (value: string) => {
        console.log('settags', value)
        tags = value
    }

    // Отправка изменений
    const onFinish = (value: any) => {
        if (post) {
            const out: HomePostType = {
                author: post.author,
                rating: post.rating,
                subject: value.subject,
                text: value.text,
                img: file || post?.img, // Поле "файл" может быть строкой или null, если файл отсутствует
                tags: tags || value.tags,
                id: post?.id
            }
            dispatch(editPost(out))
            dispatch(setIsEdited(false))
            console.log(`finish - ${value}`)


        }
    }

    //Отмена изменений
    const onCancel = () => {
        dispatch(setIsEdited(false))
    }

    return (
        <>
            {post?.id === '' && <div>LOLO</div>}
            {post?.id !== '' && <EditPostComponent
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
