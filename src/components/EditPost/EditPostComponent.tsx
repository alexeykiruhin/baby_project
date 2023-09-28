import React, {useEffect} from 'react';
import {Button, Card, Form, Input, Select, SelectProps, Upload} from 'antd';
import {NavLink} from 'react-router-dom';
import {PostProps} from '../../types/types';
import {SettingOutlined, UploadOutlined} from '@ant-design/icons';
import styles from '../CreatePost/CreatePost.module.css';
import TextArea from 'antd/es/input/TextArea';
import type {UploadFile} from 'antd/es/upload/interface';
import {BASE_URL} from '../../api/api';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {editPost, getTags} from '../../redux/slices/post';


const EditPostComponent: React.FC<PostProps> = ({post}: PostProps) => {

    const dispatch = useAppDispatch()

    let file = ''
    const onUpload = (name: string) => {
        console.log('name:', name);
        file = name
    };
    const onFinish = (value: any) => {

        const out = {
            title: value.subject,
            text: value.text,
            file: post?.img, // Поле "файл" может быть строкой или null, если файл отсутствует
            tags: value.tags,
            id: post?.id
        }

        dispatch(editPost(out))
        console.log(`finish - ${[post?.id, value.subject, value.text, value.tags, file ? file : post?.img]}`)
    }

    const fileList: UploadFile[] = [
        {
            uid: '-1',
            name: post?.img || '',
            status: 'done',
            url: 'http://127.0.0.1:5000/api/image/' + post?.img,
            // thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ];

    const options: SelectProps['options'] = [];
    const tags = useAppSelector(state => state.post.tags) || [];

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
        <>
            <Card title={'Edit post'}
                  extra={<NavLink to={`/user/${post?.author.id}`}> {/*тут ссылка нужна для стилизации кнопки*/}
                      <SettingOutlined/>
                  </NavLink>}
                  headStyle={{textAlign: 'left'}}
                  style={{maxWidth: '660px'}}
            >
                <Form
                    name="basic"
                    className={styles.editForm}
                    initialValues={{
                        subject: post?.subject, // Задаем начальное значение для поля Subject
                        text: post?.text,       // Задаем начальное значение для поля Text
                        tags: [],               // Можете задать начальные значения для Tags, если необходимо
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="subject"
                        rules={[{required: true, message: 'Please input Subject'}]}
                    >
                        <Input placeholder="Subject" maxLength={30}/>
                    </Form.Item>
                    <Form.Item
                        name="text"
                        rules={[{required: true, message: 'Please input Subject'}]}
                    >
                        <TextArea rows={10} placeholder="Text" maxLength={2000}/>
                    </Form.Item>
                    <Form.Item
                        name="tags"
                        rules={[{required: true, message: 'Please input Subject'}]}
                    >
                        <Select
                            mode="tags"
                            style={{width: '100%'}}
                            // placeholder="Tags Mode"
                            // defaultValue={tags.map((t) => t.tag_name)}
                            // value={tags.map((t) => t.tag_name)}
                            // options={options}
                            defaultValue={post?.tags}
                        >
                            {options.map(option => (
                                <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="File"
                    >
                        {post?.img && <Upload
                            action={BASE_URL + 'upload'}
                            listType="picture"
                            defaultFileList={fileList}
                            className="upload-list-inline"
                            maxCount={1}
                            onChange={(event) => {
                                console.log(event.file.name)
                                onUpload(event.file.name)
                            }}
                        > <Button icon={<UploadOutlined/>}>Upload</Button>
                        </Upload>}
                        {/*<UploadFileComponent onFinish={onFinish} onUpload={onUpload}/>*/}
                    </Form.Item>
                    <Form.Item
                        name="Button"
                    >
                        <Button type="primary" htmlType="submit" style={{minWidth: '100%'}}>
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item
                        name="Button"
                    >
                        <Button danger style={{minWidth: '100%'}}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default EditPostComponent;