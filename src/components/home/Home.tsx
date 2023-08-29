import React from "react";
import {useAppSelector, useAppDispatch} from "../../hooks/hooks";
import {changeFlag} from "../../redux/slices/home";

const Home: React.FC = () => {

    const flag = useAppSelector(state => state.home.flag);

    const dispatch = useAppDispatch();

    const handleClick = ():void => {
        dispatch(changeFlag('noHome'));
    }

    return (
        <div>
            Home
            <div>{flag}</div>
            <button onClick={handleClick}>change</button>
        </div>
    )
}

export default Home