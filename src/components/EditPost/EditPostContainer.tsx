import React, {useEffect} from 'react';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import EditPostComponent from './EditPostComponent';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {getPost} from '../../redux/slices/post';
import {EditPostType} from '../../types/types';



const EditPostContainer: React.FC = () => {
    const postId = useAppSelector(state => state.post.postId)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getPost({postId}))
        console.log(`postId - ${postId}`)
    },[])

    return (
        <>
            {/*{isCreated && <Navigate to="/" replace={true}/>}*/}
            {/*<EditPostComponent*/}
            {/*    post={post}*/}
            {/*/>*/}
        </>
    )
}

const EditPostWithRedirect = withAuthRedirect(EditPostContainer)

export default EditPostWithRedirect;
