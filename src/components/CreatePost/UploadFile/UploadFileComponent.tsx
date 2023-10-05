import React, {useState} from 'react'
import {UploadOutlined} from '@ant-design/icons';
import {Alert, Button, Upload} from 'antd';
import {BASE_URL} from '../../../api/api';
import {CreatePostType} from '../../../types/types';

const access_token = localStorage.getItem('access_token');


const UploadFileComponent: React.FC<CreatePostType> = ({onUpload}) => {
    const [isError, setIsError] = useState(false)
    const [isErrorText, setIsErrorText] = useState('')

    const beforeUpload = (file: any) => {
        // Функция проверки файла
        // Проверяем размер файла и его формат
        const isFormat = file.type === 'image/gif' || 'image/png' || 'image/jpg' || 'image/jpeg'
        if (!isFormat) {
            setIsError(true)
            setIsErrorText('Вы можете загружать только файлы в формате .png, .jpg, .jpeg, .gif')
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            setIsError(true)
            setIsErrorText('Размер файла должен быть менее 5MB!')
        }
        return isFormat && isLt2M;
    }

    return (
        <>
            {isError &&
                <Alert
                    message={isErrorText}
                    type="error"
                    style={{marginBottom: '20px'}}
                />
            }
            <Upload
                beforeUpload={beforeUpload}
                action={BASE_URL + 'upload'}
                listType="picture"
                onChange={(event) => {
                    setIsError(false)
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
}
export default UploadFileComponent
