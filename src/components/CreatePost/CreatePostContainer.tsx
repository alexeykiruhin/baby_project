import React from 'react';
import CreatePostComponent from './CreatePostComponent';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {createPost} from '../../redux/slices/post';
import {PostDataType} from '../../types/types';
import {Navigate} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';


const CreatePostContainer: React.FC = () => {

    const isCreated = useAppSelector(state => state.post.isCreated)

    const dispatch = useAppDispatch()

    let tags = ''
    let file = ''
    const onUpload = (name: string) => {
        console.log('name:', name);
        file = name
    };

    const setTags = (value: string) => {
        console.log(`selected ${value}`);
        tags = value
    };

    const onFinish = (values: any) => {
        values.File = file
        const postData: PostDataType = {
            title: values.Subject,
            text: values.Text,
            file: values.File,
            tags: tags       // Поле "теги" представлено массивом строк
        }
        dispatch(createPost(postData))
    }

    return (
        <>
            {isCreated && <Navigate to="/" replace={true}/>}
            <CreatePostComponent
                onFinish={onFinish}
                onUpload={onUpload}
                setTags={setTags}
            />
        </>
    )
}

const CreatePostWithRedirect = withAuthRedirect(CreatePostContainer)

export default CreatePostWithRedirect;

// export default CreatePostContainer;