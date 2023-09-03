import React from 'react';
import Home from "../Home/Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Breadcrumb, Layout, theme} from 'antd';
import HeaderContainer from "../Header/HeaderContainer";
import FooterComponent from "../Footer/FooterComponent";

export const {Content} = Layout;

const App: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Router>
            <Layout>
                <HeaderContainer/>
                <Content className="site-layout" style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}} items={[{title: 'Home'}]}/>
                    <div style={{padding: 24, minHeight: 380, background: colorBgContainer}}>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            {/*// /!*<Route path="/login" element={<LoginContainer/>}/>*!/*/}
                            {/*// /!*<Route path="/register" element={<Reg/>}/>*!/*/}
                            {/*// /!*<Route path="/create" element={<CreatePostContainer/>}/>*!/*/}
                            {/*// /!*<Route path="/users" element={<UsersContainer/>}/>*!/*/}
                            {/*// /!*<Route path="/user/:userId" element={<UserContainer/>}/>*!/*/}
                            {/*// /!*<Route path="/post/:postId" element={<PostViewContainer/>}/>*!/*/}
                            {/*// /!*<Route path="/tag-search" element={<TagSearch/>}/>*!/*/}
                        </Routes>
                    </div>
                </Content>
                <FooterComponent/>
            </Layout>
        </Router>
    );
};

export default App;
