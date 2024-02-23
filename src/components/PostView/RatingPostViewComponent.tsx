import {Progress} from "antd";
import React from "react";
import {RatingType} from "../../types/types";

const RatingPostViewComponent: React.FC<RatingType> = ({result}) => {
    return (
        <>
            {result >= 0 && <Progress strokeLinecap="butt" percent={result}/>}
            {result < 0 && <Progress strokeLinecap="butt" strokeColor={'red'}
                                                  percent={-1 * result}/>}
        </>
    )
}

export default RatingPostViewComponent