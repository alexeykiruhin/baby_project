import React from 'react';
import styles from './Home.module.css';
import Preloader from "../common/Preloader/Preloader";

const Home: React.FC = () => {

    return (
        <div className={styles.Home}>
            <div className={styles.body} >
                <div className={styles.wrapperDifferentPosts}>
                    {/*<div className={!props.isSubsPosts ? 'active' : ''} onClick={props.togglePostsType}>Все посты</div>*/}
                    {/*<div className={props.isSubsPosts ? 'active' : ''} onClick={props.togglePostsType}>Подписки</div>*/}
                </div>
                <Preloader />
                {/*{(props.isFetching ?*/}
                {/*    <Preloader /> :*/}
                {/*    // (props.posts.map((post, index) => <PostContainer key={`post-${index}`} index={index} post={post} />))*/}
                {/*    (props.posts.map((post, index) => {*/}
                {/*        if (index !== props.posts.length-1) return <PostContainer key={`post-${index}`} index={index} post={post} />*/}
                {/*        return <PostContainer refIS={props.refIS} key={`post-${index}`} index={index} post={post} />*/}
                {/*    }))*/}
                {/*)}*/}
            </div>
        </div>
    )
}

export default Home