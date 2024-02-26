import EditCommentComponent from "./EditCommentComponent";
import React from "react";
import {CommentsProps} from "../../../types/types";

const EditCommentContainer: React.FC<CommentsProps> = ({comment, handleToggleEdit, saveEditComment}) => {
    return <EditCommentComponent comment={comment} handleToggleEdit={handleToggleEdit} saveEditComment={saveEditComment}/>
}

export default EditCommentContainer