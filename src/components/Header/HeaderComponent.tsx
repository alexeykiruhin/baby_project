import React from 'react';
import {Layout} from "antd";
import styles from './Header.module.css';
import MenuComponent from "../Menu/MenuComponent";
import {NavLink} from 'react-router-dom';

const {Header} = Layout;

const HeaderComponent: React.FC= () => {
    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
            // color='light'
        >
            <NavLink to='/'><div className={styles.Logo}><h3 style={{color: '#1677ff'}}>TrendTide</h3></div></NavLink>
            <MenuComponent/>
        </Header>
    )
}

export default HeaderComponent;