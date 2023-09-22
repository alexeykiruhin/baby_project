import React from 'react';
import CreatePostComponent from './CreatePostComponent';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {createPost} from '../../redux/slices/post';
import {PostDataType} from '../../types/types';
import {Navigate} from 'react-router-dom';


const CreatePostContainer: React.FC = () => {

    const isCreated = useAppSelector(state => state.post.isCreated)

    const dispatch = useAppDispatch()

    let file = ''
    const onUpload = (name: string) => {
        console.log('name:', name);
        file = name
    };

    const onFinish = (values: any) => {
        values.File = file
        console.log('[values.File.Tags]', values.Tags);
        const postData: PostDataType = {
            title: values.Subject,
            text: values.Text,
            file: values.File,
            tags: values.Tags,       // Поле "теги" представлено массивом строк
        }
        dispatch(createPost(postData))
    }

    console.log(`isCreated - ${isCreated}`)
    return (
        <>
            {isCreated && <Navigate to="/" replace={true}/>}
            <CreatePostComponent
                onFinish={onFinish}
                onUpload={onUpload}
            />
        </>
    )
}

export default CreatePostContainer;