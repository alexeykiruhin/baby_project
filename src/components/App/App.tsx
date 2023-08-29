import React from 'react';
import './App.css';
import Home from "../Home/Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div className="App">
                {/*<HeaderContainer/>*/}
                <div className={'Content'}>
                    {/*<NavBar/>*/}
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        {/*<Route path="/login" element={<LoginContainer/>}/>*/}
                        {/*<Route path="/register" element={<Reg/>}/>*/}
                        {/*<Route path="/create" element={<CreatePostContainer/>}/>*/}
                        {/*<Route path="/users" element={<UsersContainer/>}/>*/}
                        {/*<Route path="/user/:userId" element={<UserContainer/>}/>*/}
                        {/*<Route path="/post/:postId" element={<PostViewContainer/>}/>*/}
                        {/*<Route path="/tag-search" element={<TagSearch/>}/>*/}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
