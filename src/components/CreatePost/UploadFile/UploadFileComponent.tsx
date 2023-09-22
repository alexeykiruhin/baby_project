import React from 'react'
import {UploadOutlined} from '@ant-design/icons';
import {Button, Upload} from 'antd';
import {BASE_URL} from '../../../api/api';
import {CreatePostType} from '../../../types/types';

const access_token = localStorage.getItem('access_token');

const UploadFileComponent: React.FC<CreatePostType> = ({onUpload}) => (
    <>
        <Upload
            action={BASE_URL + 'upload'}
            listType="picture"
            onChange={(event) => {
                console.log(event.file.name)
                onUpload(event.file.name)
            }}
            maxCount={1}
            headers={{
                // Здесь вы можете добавить нужные заголовки
                Authorization: `Bearer ${access_token}`
                // Другие заголовки...
            }}
            withCredentials={true}
        >
            <Button icon={<UploadOutlined/>}>Upload</Button>
        </Upload>
    </>
)
export default UploadFileComponent
