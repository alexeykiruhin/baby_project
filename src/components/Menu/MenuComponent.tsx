import React from 'react';
import {Menu} from "antd";
import {useLocation} from "react-router-dom";
import createMenuProps from "../../functions/createMenuProps";
// import styles from './Menu.module.css';

const MenuComponent: React.FC = () => {
    let location = useLocation()
    const loc = ['/', '/rating', '/create']
    const props = createMenuProps(loc, location.pathname)
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={props.defaultSelectedKeys}
            items={props.items}
            //без ширины схлопывается последняя кнопка
            style={{minWidth: '250px'}}
        />
    )
}

export default MenuComponent;