import React from 'react';
import {Layout} from "antd";
import styles from './Header.module.css';
import MenuComponent from "../Menu/MenuComponent";

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
        >
            <div className={styles.Logo}>Logo</div>
            <MenuComponent/>
        </Header>
    )
}

export default HeaderComponent;