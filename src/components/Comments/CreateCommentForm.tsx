import React from "react";
import {Button, Form, Input} from 'antd';
import styles from "./CreateComment.module.css";
import Title from "antd/es/typography/Title";
import UploadFileComponent from "../CreatePost/UploadFile/UploadFileComponent";
import {CreateCommentType} from "../../types/types";


const {TextArea} = Input;

const CreateCommentForm: React.FC<CreateCommentType> = ({onFinish, onUpload, AddComment}) => {
    const [form] = Form.useForm();

    const handleCancelComment = () => {
        AddComment(false)
    }

    const sendCommentText = (obj: { Text: string }) => {
        let text = obj.Text;
        onFinish(text);
        // очистка поля ввода комментария
        form.resetFields()
    }

    return (
        <div className={styles.CreateComment}>
            <Title level={3} style={{margin: '20px 0'}}>
                {/*<a href={#comment}>Add comment</a> // сделать якорь, при нажатии на add comment перемещение к форме*/}
                Add comment
            </Title>
            <Form
                form={form}
                name="basic"
                className={styles.createCommentForm}
                initialValues={{File: '', Text: ''}}
                onFinish={sendCommentText}
                autoComplete="off"
            >
                <Form.Item
                    name="Text"
                    rules={[{required: true, message: 'Please input comment'}]}
                >
                    <TextArea rows={10} placeholder="Add comment" maxLength={2000}/>
                </Form.Item>
                <Form.Item
                    name="File"
                >
                    <UploadFileComponent onFinish={onFinish} onUpload={onUpload}/>
                </Form.Item>
                <Form.Item
                    name="Button"
                >
                    <Button type="primary" htmlType="submit" style={{minWidth: '100%'}}>
                        Submit
                    </Button>
                    <Button
                        type="default"
                        htmlType="submit"
                        style={{minWidth: '100%', marginTop: '10px'}}
                        onClick={handleCancelComment}
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateCommentForm