import {useLocation} from "react-router-dom";
import React from 'react';
import {Layout, Menu, theme} from 'antd';
import createMenuProps from "../../functions/createMenuProps";
import CPUsersComponent from "./UI/CPUsers/CPUsersComponent";
import CPPostsComponent from "./UI/CPPosts/CPPostsComponent";

const {Content, Sider} = Layout;

const CPComponent = () => {
    let location = useLocation()
    const x = location.pathname.split('/')
    const path = x[x.length - 1]
    console.log('path', path)
    const loc = ['/users', '/posts']
    const predomain = '/cp'
    const props = createMenuProps(loc, location.pathname, predomain)

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '50vh',
                    position: 'fixed',
                    left: 0,
                    top: '64px',
                    bottom: 0,
                    padding: '16px 0'
                }}
            >
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={props.defaultSelectedKeys} items={props.items}/>
            </Sider>
            <Layout style={{marginLeft: 200}}>
                <Content style={{margin: '0 16px', overflow: 'initial'}}>
                    <div
                        style={{
                            padding: 1,
                            textAlign: 'center',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {path === 'users' && <CPUsersComponent/>}
                        {path === 'posts' && <CPPostsComponent/>}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default CPComponent