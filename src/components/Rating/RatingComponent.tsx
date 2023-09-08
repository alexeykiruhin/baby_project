import React from 'react';
import {Space, Table, Tag} from 'antd';

const {Column} = Table;

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const data: DataType[] = [
    {
        key: '1',
        name: 'John',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const RatingComponent: React.FC = () => (
    <Table dataSource={data}>
        <Column title="Name" dataIndex="name" key="name"/>
        <Column title="Age" dataIndex="age" key="age"/>
        <Column title="Address" dataIndex="address" key="address"/>
        <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags: string[]) => (
                <>
                    {tags.map((tag) => (
                        <Tag color="blue" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
            )}
        />
        <Column
            title="Action"
            key="action"
            render={(_: any, record: DataType) => (
                <Space size="middle">
                    <a href='/'>Invite {record.name}</a>
                    <a href='/'>Delete</a>
                </Space>
            )}
        />
    </Table>
)

export default RatingComponent;