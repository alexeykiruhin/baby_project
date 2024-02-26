import React, {useState} from 'react';
import {
    CalendarOutlined, TeamOutlined,
} from '@ant-design/icons';
import {Menu, Switch} from 'antd';
import type {GetProp, MenuProps} from 'antd';
import {NavLink} from "react-router-dom";

type MenuTheme = GetProp<MenuProps, 'theme'>;
type MenuItem = GetProp<MenuProps, 'items'>[number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<NavLink className={'item'} to="/cp">CP</NavLink>, '1', <TeamOutlined/>,),
    getItem(<NavLink className={'item'} to="/cp/users">Users</NavLink>, '2', <TeamOutlined/>,),
    getItem(<NavLink className={'item'} to="/">Posts</NavLink>, '3', <CalendarOutlined/>),
];

const CPMenuComponent = () => {
    const [theme, setTheme] = useState<MenuTheme>('light');

    const changeTheme = (value: boolean) => {
        setTheme(value ? 'dark' : 'light');
    };
    return (
        <div style={{flexGrow: '256px'}}>
            <Menu
                style={{width: 256, borderRadius: '10px'}}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode={'vertical'}
                theme={theme}
                items={items}
            />
            <div style={{marginTop: '10px'}}>
                <Switch onChange={changeTheme}/> <span>Change Style</span>
            </div>
        </div>
    )
}

export default CPMenuComponent