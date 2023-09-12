import React from 'react';
import HomeComponent from '../Home/HomeComponent';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Layout, theme} from 'antd';
import HeaderContainer from '../Header/HeaderContainer';
import FooterComponent from '../Footer/FooterComponent';
import RatingComponent from '../Rating/RatingComponent';
import CreateComponent from '../Create/CreateComponent';
import UserInfoComponent from '../UserInfo/UserInfoComponent';
import LoginContainer from '../Login/LoginContainer';

export const {Content} = Layout;

const App: React.FC = () => {


    //Переменные для темы antd
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Router>
            <Layout>
                <HeaderContainer/>
                <UserInfoComponent/>
                <Content className="site-layout"
                         style={{padding: '0 50px'}}>
                    <div style={{padding: 24, minHeight: 380, background: colorBgContainer}}>
                        <Routes>
                            <Route path="/" element={<HomeComponent/>}/>
                            <Route path="/rating" element={<RatingComponent/>}/>
                            <Route path="/create" element={<CreateComponent/>}/>
                            <Route path="/login" element={<LoginContainer/>}/>
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
