import React from 'react';
import styles from './Home.module.css';
import {Tabs} from 'antd';
import type {TabsProps} from 'antd';
import SubPostListComponent from '../SubPostList/SubPostListComponent';
import {useAppDispatch} from '../../hooks/hooks';
import {fetchPosts, fetchSubPosts} from '../../redux/slices/home';
import PostListContainer from '../PostList/PostListContainer';


const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Все',
        children: <PostListContainer/>,
    },
    {
        key: '2',
        label: 'Подписки',
        children: <SubPostListComponent/>,
    },
];

const HomeComponent: React.FC = () => {
    const dispatch = useAppDispatch();

    const onChange = (key: string) => {
        switch (key) {
            case '1':
                console.log(key);
                dispatch(fetchPosts());
                break;
            case '2':
                console.log(key);
                dispatch(fetchSubPosts());
                break;
        }
    }

    return (
        <div className={styles.Home}>
            <div className={styles.body}>
                <Tabs className={styles.Tabs}
                      defaultActiveKey="1"
                      items={items}
                      onChange={onChange}
                      size={'large'}
                      centered={true}
                />
            </div>
        </div>
    )
}

export default HomeComponent;