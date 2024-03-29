import React from 'react';
import {UploadFile} from 'antd/es/upload/interface';

export interface AuthorType {
    id: string
    img: string
    username: string
    statusText: string
}

export interface RatingType {
    result: number;
}

export interface TagType {
    tag_name: string;
}
//интерфейс для поста на главной странице
export interface HomePostType {
    author: AuthorType
    id: string
    rating: RatingType
    tags: TagType[]
    text: string
    subject: string
    img: string
}

export type PostProps = {
    index?: number
    post: HomePostType | undefined
    flagSettings?: string
    flagView?: 'single' | 'list'
}

export type LoginPass = {
    username: string
    password: string
}

export type PostListComponentPropsType = {
    items: Array<HomePostType>
    flagSettings?: string
}

// User

export type editStatusPropsType = {
    isEdit: boolean
    editStatus: (text: string | null) => void
    updateIsEdit: (value: boolean) => void
}

export type SubUnsubPropsType = {
    subscribe: (userId: string | null) => void
    unsubscribe: (userId: string | null) => void
}

export type editStatusType = {
    uid: string | undefined
    text: string | null
}

export type newTextType = {
    newText: string
    editNewText: React.Dispatch<React.SetStateAction<string>>
}

export type sendScoreType = {
    postId: string | undefined
    score: number
}


// Registration

export type returnFinishReg = {
    email: string,
    username: string,
    password: string,
    agreement: boolean,
}


//Post

export type RatingUserType = {
    id: string
    img: string
    minus: number
    plus: number
    rating: number
    statusText: string
    subscribers: number
    username: string
}

export type EditPostPropsType = {
    isEdited: boolean
}


export type EditPostType = {
    postId?: string | undefined
}


export type PostDataType = {
    id?: string
    title: string
    text: string
    file?: string | null // Поле "файл" может быть строкой или null, если файл отсутствует
    tags: string       // Поле "теги" представлено строкой
};

export type CreatePostType = {
    onFinish: (values: any) => void
    onUpload: (values: any) => void
    setTags?: (values: any) => void
}
export type EditPostComponentType = {
    onFinish: (values: any) => void
    onCancel: (values: any) => void
    onUpload: (values: any) => void
    setTags?: (values: any) => void
    // options: SelectProps['options']
    fileList: UploadFile[]
    // setTags?: (values: any) => void
}

//Comment

//интерфейс для данных комментария при создании его
export type CommentDataType = {
    comment_id?: string
    post_id: string | undefined
    text: string
    file?: string | null // Поле "файл" может быть строкой или null, если файл отсутствует
};

export type CreateCommentType = {
    onFinish: (values: any) => void
    onUpload: (values: any) => void
    setTags?: (values: any) => void
    AddComment: (values: boolean) => void
}

//интерфейс для комментария
export interface CommentType {
    author: AuthorType
    id: string
    // rating: RatingType
    // tags: TagType[]
    text: string
    img?: string
}

// пропсы для отображения комментариев
export type CommentsProps = {
    index?: number
    comment: CommentType | undefined
    myUserId?: string
    handleToggleEdit?: (id: string) => void
    saveEditComment?: (text: string, id: string) => void
    deleteEditComment?: (id: string) => void
    flagSettings?: string
}

// Post ID
export type PostIdType = {
    postId?: string | undefined
}
