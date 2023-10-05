import React from 'react';
import {Table} from 'antd';

const {Column} = Table;

export interface DataType {
    key: React.Key;
    username: string;
    rating: number;
    subscribers: number;
}


const RatingComponent: React.FC<{ out: DataType[] }> = ({out}) => {
    return (
        <Table dataSource={out}>
            <Column
                title="Name"
                key="name"
                render={(record: DataType) => (
                    record.username
                )}/>
            <Column
                title="Rating"
                key="rating"
                render={(record: DataType) => (
                    record.rating
                )}/>
            <Column
                title="Subscribers"
                key="subscribers"
                render={(record: DataType) => (
                    record.subscribers
                )}/>
        </Table>
    )
}

export default RatingComponent;