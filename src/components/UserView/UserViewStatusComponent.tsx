import React from 'react';
import {Form, Input} from 'antd';
import {RightCircleOutlined} from '@ant-design/icons';

interface Props {
    statusText: string
    editStatus: (text: (string | null)) => void
}

const UserViewStatusComponent: React.FC<Props> = ({statusText, editStatus}) => {
    return <Form
        name="status"
        initialValues={{text: statusText}}
    >
        <Form.Item
            name="text"
            rules={[{required: true, message: 'Please input your Username!'}]}
        >
            <Input
                placeholder="Status"
                name={'text'}
                onBlur={(event) => {
                    console.log(event.target.value)
                    editStatus(event.target.value)
                }}
                autoFocus
                suffix={
                    <RightCircleOutlined/>
                }
            />
        </Form.Item>
    </Form>
}

export default UserViewStatusComponent