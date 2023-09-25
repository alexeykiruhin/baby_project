import React from 'react';
import {Button, Card, Form, Input, Select, SelectProps} from 'antd';
import {NavLink} from 'react-router-dom';
import {PostProps} from '../../types/types';
import {SettingOutlined} from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import styles from '../CreatePost/CreatePost.module.css';
import UploadFileComponent from '../CreatePost/UploadFile/UploadFileComponent';
import TextArea from 'antd/es/input/TextArea';
import {useAppSelector} from '../../hooks/hooks';


const EditPostComponent: React.FC<PostProps> = ({post}: PostProps) => {

    let tags = useAppSelector(state => state.post.tags)
    const options: SelectProps['options'] = [];

    // for (let i = 0; i < tags.length; i++) {
    //     options.push({
    //         value: tags[i],
    //         label: tags[i],
    //     });
    // }


    return (
        <>
            <Card title={'Edit post'}
                  extra={<NavLink to={`/user/${post?.author.id}`}>
                      <SettingOutlined/>
                  </NavLink>}
                  headStyle={{textAlign: 'left'}}
                  style={{maxWidth: '660px'}}
            >
                <Form
                    name="basic"
                    className={styles.editForm}
                    initialValues={{File: ''}}
                    // onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="Subject"
                        rules={[{required: true, message: 'Please input Subject'}]}
                    >
                        <Input placeholder="Subject" maxLength={30}/>
                    </Form.Item>
                    <Form.Item
                        name="Text"
                        rules={[{required: true, message: 'Please input Subject'}]}
                    >
                        <TextArea rows={10} placeholder="Text" maxLength={2000}/>
                    </Form.Item>
                    <Form.Item
                        name="Tags"
                        rules={[{required: true, message: 'Please input Subject'}]}
                    >
                        <Select
                            mode="tags"
                            style={{width: '100%'}}
                            placeholder="Tags Mode"
                            // onChange={setTags}
                            // options={options}
                        />
                    </Form.Item>
                    <Form.Item
                        name="File"
                    >
                        {/*<UploadFileComponent onFinish={onFinish} onUpload={onUpload}/>*/}
                    </Form.Item>
                    <Form.Item
                        name="Button"
                    >
                        <Button type="primary" htmlType="submit" style={{minWidth: '100%'}}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default EditPostComponent;