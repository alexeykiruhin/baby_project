import React from 'react'
import {Avatar, Button, Card, Col, Divider, Row, Statistic} from 'antd';
import PostListComponent from '../PostList/PostListComponent';
import {
    EditPostPropsType,
    editStatusPropsType,
    newTextType,
    PostListComponentPropsType,
    SubUnsubPropsType
} from '../../types/types';
import Title from 'antd/es/typography/Title';
import {DislikeOutlined, EditOutlined, LikeOutlined} from '@ant-design/icons';
import {userType} from '../../redux/slices/user';
import UserViewStatusComponent from './UserViewStatusComponent';
import EditPostWithRedirect from '../EditPost/EditPostContainer';


const UserViewComponent: React.FC<
    PostListComponentPropsType &
    userType &
    SubUnsubPropsType &
    editStatusPropsType &
    newTextType &
    EditPostPropsType> = ({
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
                              userId,
                              editStatus,
                              isEdit,
                              updateIsEdit,
                              newText,
                              editNewText,
                              isEdited
                          }) => {


    return (
        <Row style={{marginLeft: '-12px', marginRight: '-12px'}}>
            <Col md={{span: 24}} lg={{span: 7}} style={{padding: '0 12px'}}>
                <Card style={{padding: '24px', textAlign: 'center', borderRadius: '2px'}}>
                    <Avatar
                        style={{width: '110px', height: '110px'}}
                        src={img}
                    />
                    <Title level={3} style={{cursor: 'default'}}>{username}</Title>
                    {isEdit && isMe
                        ? <UserViewStatusComponent statusText={statusText} editStatus={editStatus}/>
                        : <Title level={4} onClick={() => {
                            updateIsEdit(true)
                        }}>{statusText} <EditOutlined/></Title>
                    }
                    <Divider style={{cursor: 'default'}} plain>Поставил</Divider>
                    <Row style={{cursor: 'default'}} gutter={16}>
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
                    {isEdited
                        ? <EditPostWithRedirect/>
                        : <PostListComponent items={items} width={200}/>
                    }
                </Card>
            </Col>
        </Row>
    )
}
export default UserViewComponent
