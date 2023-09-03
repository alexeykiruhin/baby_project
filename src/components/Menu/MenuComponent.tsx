import React from 'react';
import {Menu} from "antd";
// import styles from './Menu.module.css';

const MenuComponent: React.FC = () => {
    const menuItems: Array<string> = ['Posts', 'Create', 'Search',]
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={menuItems.map((item: string, index: number): { key: string, label: string } => ({
                key: String(index + 1),
                label: `${item}`,
            }))}
        />
    )
}

export default MenuComponent;