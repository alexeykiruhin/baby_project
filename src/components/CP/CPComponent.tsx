import React from 'react';
import CPMenuComponent from "./UI/Menu/CPMenuComponent";
import {useLocation} from "react-router-dom";
import CPUsersComponent from "./UI/Menu/CPUsersComponent";

const CPComponent = () => {
    let location = useLocation()
    const x = location.pathname.split('/')
    const path = x[x.length - 1]

    return (
        <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
            <CPMenuComponent/>
            <div style={{flexGrow: 2}}>
                {path !== 'users' && <span>CP</span>}
                {path === 'users' && <CPUsersComponent />}
            </div>
        </div>
    )
}

export default CPComponent