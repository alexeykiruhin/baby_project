import React from 'react';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import EditPostComponent from './EditPostComponent';
import {useAppSelector} from '../../hooks/hooks';


const EditPostContainer: React.FC = () => {
    const postId = useAppSelector(state => state.post.postId)
    const post = useAppSelector(state => {
        return state.user.posts.filter((post) => post.id === postId)
    })

    return (
        <>
            {/*{isCreated && <Navigate to="/" replace={true}/>}*/}
            {post !== undefined && <EditPostComponent post={post[0]}/>}
        </>
    )
}

const EditPostWithRedirect = withAuthRedirect(EditPostContainer)

export default EditPostWithRedirect;
