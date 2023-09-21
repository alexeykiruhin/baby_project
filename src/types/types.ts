import React from 'react';

export interface AuthorType {
    id: number;
    img: string;
    username: string;
}

export interface RatingType {
    result: number;
}

export interface TagType {
    tag_name: string;
}

export interface PostType {
    author: AuthorType;
    id: string;
    rating: RatingType;
    tags: TagType[];
    text: string;
    subject: string;
}

export type PostProps = {
    index: number,
    post: PostType
}

export type LoginPass = {
    username: string,
    password: string
}

export type PostListComponentPropsType = {
    items: Array<PostType>
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