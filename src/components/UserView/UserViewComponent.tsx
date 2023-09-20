import React from 'react'
import {Avatar, Button, Card, Col, Divider, Row, Statistic} from 'antd';
import PostListComponent from '../PostList/PostListComponent';
import {PostListComponentPropsType, SubUnsubPropsType} from '../../types/types';
import Title from 'antd/es/typography/Title';
import {DislikeOutlined, LikeOutlined} from '@ant-design/icons';
import {userType} from '../../redux/slices/user';


const UserViewComponent: React.FC<PostListComponentPropsType & userType & SubUnsubPropsType> = ({
                                                                                                    items,
                                                                                                    username,
                                                                                                    statusText,
                                                                                                    img,
                                                                                                    plus,
                                                                                                    minus,
                                                                                                    rating,
                                                                                                    subscribers,
                                                                                                    isSubs,
                                                                                                    isMe,
                                                                                                    subscribe,
                                                                                                    unsubscribe,
                                                                                                    userId
                                                                                                }) => {
    return (
        <Row style={{marginLeft: '-12px', marginRight: '-12px'}}>
            <Col md={{span: 24}} lg={{span: 7}} style={{padding: '0 12px'}}>
                <Card style={{padding: '24px', textAlign: 'center', borderRadius: '2px'}}>
                    <Avatar
                        style={{width: '110px', height: '110px'}}
                        src={img}
                    />
                    <Title level={3}>{username}</Title>
                    <Title level={4}>{statusText}</Title>
                    <Divider plain>Поставил</Divider>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Statistic value={plus} prefix={<LikeOutlined/>}/>
                        </Col>
                        <Col span={12}>
                            <Statistic value={-1 * minus} prefix={<DislikeOutlined/>}/>
                        </Col>
                        <Divider/>
                        <Col span={12}>
                            <Statistic title="Rating" value={rating}/>
                        </Col>
                        <Col span={12}>
                            <Statistic title="Subscribers" value={subscribers}/>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        {!isMe &&
                            <Col span={24}>
                                {isSubs
                                    ? <Button
                                        style={{height: '40px', width: '100%'}}
                                        onClick={() => {
                                            unsubscribe(userId)
                                        }}
                                    >Unsubscribe</Button>
                                    : <Button
                                        style={{height: '40px', width: '100%'}}
                                        onClick={() => {
                                            subscribe(userId)
                                        }}
                                    >Subscribe</Button>
                                }
                            </Col>}
                    </Row>
                </Card>
            </Col>
            <Col md={{span: 24}} lg={{span: 17}} style={{padding: '0 12px'}}>
                <Card style={{padding: '24px', textAlign: 'center', borderRadius: '2px'}}>
                    <PostListComponent items={items}/>
                </Card>
            </Col>
        </Row>
    )
}
export default UserViewComponent
