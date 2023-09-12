import React from 'react';
import styles from './Home.module.css';
import {Tabs} from 'antd';
import type {TabsProps} from 'antd';
import PostListComponent from '../PostList/PostListComponent';
import SubPostListComponent from '../SubPostList/SubPostListComponent';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Все',
        children: <PostListComponent/>,
    },
    {
        key: '2',
        label: 'Подписки',
        children: <SubPostListComponent/>,
    },
];

const HomeComponent: React.FC = () => {
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