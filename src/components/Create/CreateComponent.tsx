import React from 'react';
import {Button, Form, Input} from 'antd';
import styles from './Create.module.css';

const {TextArea} = Input;


const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const CreateComponent: React.FC = () => {
    return (
        <div className={styles.Create}>
            <Form
                name="basic"
                className={styles.createForm}
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Input placeholder="Subject" maxLength={6}/>
                <TextArea rows={4} placeholder="Description" maxLength={6}/>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateComponent;