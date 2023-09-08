import React from 'react';
import styles from './Home.module.css';
// import Preloader from "../common/Preloader/Preloader";
// import LoginContainer from "../LoginComponent/LoginContainer";
import RegContainer from '../Reg/RegContainer';
import {Tabs} from 'antd';
import type {TabsProps} from 'antd';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Все',
        children: 'Content of Tab Pane 1',
    },
    {
        key: '2',
        label: 'Подписки',
        children: <RegContainer/>,
    },
];

const HomeComponent: React.FC = () => {

    return (
        <div className={styles.Home}>
            <div className={styles.body}>
                <Tabs className={styles.Tabs} defaultActiveKey="1" items={items} onChange={onChange} size={'large'}
                      centered={true}/>
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

export default HomeComponent;