import CPComponent from "./CPComponent";
import {useAppDispatch} from "../../hooks/hooks";
import {useEffect} from "react";
import {getCP} from "../../redux/slices/cp";

const CPContainer = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCP())
    }, [dispatch]);
    return <CPComponent />
}

export default CPContainer