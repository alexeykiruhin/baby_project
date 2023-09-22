import React from 'react';
import {Button, Form, Input} from 'antd';
import styles from './CreatePost.module.css';
import Title from 'antd/es/typography/Title';
import UploadFileComponent from './UploadFile/UploadFileComponent';
import {CreatePostType} from '../../types/types';

const {TextArea} = Input;



const CreatePostComponent: React.FC<CreatePostType> = ({onFinish, onUpload}) => {
    return (
        <div className={styles.Create}>
            <Title level={3} style={{margin: '0 0 20px 0'}}>
                Create post
            </Title>
            <Form
                name="basic"
                className={styles.createForm}
                initialValues={{File: ''}}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="Subject"
                    rules={[{required: true, message: 'Please input Subject'}]}
                >
                    <Input placeholder="Subject" maxLength={6}/>
                </Form.Item>
                <Form.Item
                    name="Text"
                    rules={[{required: true, message: 'Please input Subject'}]}
                >
                    <TextArea rows={10} placeholder="Text" maxLength={6}/>
                </Form.Item>
                <Form.Item
                    name="Tags"
                    rules={[{required: true, message: 'Please input Subject'}]}
                >
                    <Input placeholder="Tags" maxLength={600}/>
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
                </Form.Item>
            </Form>
        </div>
)
}

export default CreatePostComponent;