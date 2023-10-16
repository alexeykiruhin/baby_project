import React from 'react';
import {Button, Card, Form, Input, Select, SelectProps, Upload} from 'antd';
import {EditPostComponentType, PostProps} from '../../types/types';
import {SettingOutlined, UploadOutlined} from '@ant-design/icons';
import styles from '../CreatePost/CreatePost.module.css';
import TextArea from 'antd/es/input/TextArea';
import {BASE_URL} from '../../api/api';
import {useAppSelector} from '../../hooks/hooks';


const EditPostComponent: React.FC<PostProps & EditPostComponentType> = ({
                                                                            post,
                                                                            onFinish,
                                                                            onCancel,
                                                                            onUpload,
                                                                            setTags,
                                                                            fileList
                                                                        }) => {

    // const [defValue, setDefValue] = useState(post?.tags.map(tag => tag.tag_name))
    const tags = useAppSelector(state => state.post.AllTags) || []
    const options: SelectProps['options'] = [];
    // Заполняем массив опций для селекта
    for (let i = 0; i < tags.length; i++) {
        options.push({
            value: tags[i],
            label: tags[i],
        });
    }

    console.log('post', post)
    return (
        <>
            <Card title={'Edit post'}
                  extra={
                      // <NavLink to={`/user/${post?.author.id}`}> {/*тут ссылка нужна для стилизации кнопки*/}
                      <SettingOutlined/>
                      // </NavLink>
                  }
                  headStyle={{textAlign: 'left'}}
                  style={{maxWidth: '660px'}}
            >
                <Form
                    name="basic"
                    className={styles.editForm}
                    initialValues={{
                        subject: post?.subject, // Задаем начальное значение для поля Subject
                        text: post?.text,       // Задаем начальное значение для поля Text
                        tags: [],       // Можете задать начальные значения для Tags, если необходимо
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
                        rules={[{required: true, message: 'Please input Tags'}]}
                        initialValue={'sd'}
                    >
                        <Select
                            mode="tags"
                            style={{width: '100%'}}
                            onChange={setTags}
                            options={options}
                        />
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
                        >
                            <Button
                                icon={<UploadOutlined/>}
                                style={{marginBottom: '15px'}}
                            >Upload</Button>
                        </Upload>}
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
                        <Button danger style={{minWidth: '100%'}} onClick={onCancel}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default EditPostComponent;