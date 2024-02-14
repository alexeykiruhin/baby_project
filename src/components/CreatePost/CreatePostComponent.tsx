import React, {useEffect} from 'react';
import {Button, Form, Input, Select, SelectProps} from 'antd';
import styles from './CreatePost.module.css';
import Title from 'antd/es/typography/Title';
import UploadFileComponent from './UploadFile/UploadFileComponent';
import {CreatePostType} from '../../types/types';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {getTags} from '../../redux/slices/post';

const {TextArea} = Input;


const CreatePostComponent: React.FC<CreatePostType> = ({onFinish, onUpload, setTags}) => {
    const dispatch = useAppDispatch()
    let tags = useAppSelector(state => state.post.AllTags) || []
    const options: SelectProps['options'] = [];

    for (let i = 0; i < tags.length; i++) {
        options.push({
            value: tags[i],
            label: tags[i],
        });
    }
    // options.push(tags)
    useEffect(() => {
        dispatch(getTags())
    }, [dispatch])


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
                    <Input placeholder="Subject" maxLength={50}/>
                </Form.Item>
                <Form.Item
                    name="Text"
                    rules={[{required: true, message: 'Please input Subject'}]}
                >
                    <TextArea rows={10} placeholder="Text" maxLength={2000}/>
                </Form.Item>
                <Form.Item
                    name="Tags"
                    rules={[{required: true, message: 'Please input Tags'}]}
                >
                    <Select
                        mode="tags"
                        style={{width: '100%'}}
                        placeholder="Tags Mode"
                        onChange={setTags}
                        options={options}
                    />
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