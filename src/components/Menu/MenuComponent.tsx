import React from 'react';
import {Menu, MenuProps} from "antd";
import {NavLink} from "react-router-dom";
// import styles from './Menu.module.css';

const MenuComponent: React.FC = () => {
    // const menuItems: Array<string> = ['Posts', 'Create', 'Search',]
    // type Item = {
    //     key:string,
    //     label: string,
    //     to: string
    // }
    // const menuItems: Array<Item> = [
    //     {key: '1', label: 'Posts', to: '/'},
    //     {key: '2', label: 'Rating', to: '/rating'},
    //     {key: '3', label: 'Create', to: '/create'}
    // ];
    const item: MenuProps['items'] = [
        {
            label: (
                <NavLink className={'item'} to="/">Posts</NavLink>
            ),
            key: 0,
        },
        {
            label: (
                <NavLink className={'item'} to="/rating">Rating</NavLink>
            ),
            key: 1,
        },
        {
            label: (
                <NavLink className={'item'} to="/create">Create</NavLink>
            ),
            key: 2,
        },
    ];

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            // items={menuItems.map((item: string, index: number): { key: string, label: string } => ({
            //     key: String(index + 1),
            //     label: `${item}`,
            // }))}
            items={item}
        />
    )
}

export default MenuComponent;