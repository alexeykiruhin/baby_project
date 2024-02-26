import React from 'react';
import {Menu, MenuProps} from "antd";
import {NavLink, useLocation} from "react-router-dom";
// import styles from './Menu.module.css';

const MenuComponent: React.FC = () => {
    let location = useLocation()
    console.log('MENU _ ', location.pathname)
    const loc = ['/', '/rating', '/create']
    let x: string[] = ['0']
    switch (location.pathname) {
        case loc[0]: {
            x = ['0']
            break
        }
        case loc[1]: {
            x = ['1']
            break
        }
        case loc[2]: {
            x = ['2']
            break
        }
    }
    const item: MenuProps['items'] = [
        {
            label: (
                <NavLink className={'item'} to="/">Posts</NavLink>
            ),
            key: 0,
            style: {borderRadius: '8px'}
        },
        {
            label: (
                <NavLink className={'item'} to="/rating">Rating</NavLink>
            ),
            key: 1,
            style: {borderRadius: '8px'}
        },
        {
            label: (
                <NavLink className={'item'} to="/create">Create</NavLink>
            ),
            key: 2,
            style: {borderRadius: '8px'}
        },
    ];

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={x}
            items={item}
        />
    )
}

export default MenuComponent;