import React from 'react';
import {Menu, MenuProps} from "antd";
import {NavLink} from "react-router-dom";
// import styles from './Menu.module.css';

const MenuComponent: React.FC = () => {

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
            defaultSelectedKeys={['0']}
            items={item}
        />
    )
}

export default MenuComponent;