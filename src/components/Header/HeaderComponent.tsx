import React from 'react';
import {Layout} from "antd";
import styles from './Header.module.css';
import MenuComponent from "../Menu/MenuComponent";
import {NavLink} from 'react-router-dom';
import UserInfoComponent from "../UserInfo/UserInfoComponent";

const {Header} = Layout;

const HeaderComponent: React.FC = () => {
    return (
        <Header
            style={{
                position: 'fixed',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
            // color='light'
        >
            <>
                <NavLink to='/'>
                    <div className={styles.Logo}><h3 style={{color: '#1677ff'}}>TrendTide</h3></div>
                </NavLink>
                <MenuComponent/>
            </>
            <UserInfoComponent/>
        </Header>
    )
}

export default HeaderComponent;