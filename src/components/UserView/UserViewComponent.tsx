import React from 'react'
import {Avatar, Card, Col, Row} from 'antd';

const UserViewComponent = () => {
    return (
        <Row style={{marginLeft: '-12px', marginRight: '-12px'}}>
            <Col md={{span: 24}} lg={{span: 7}} style={{padding: '0 12px'}}>
                <Card style={{padding: '24px', textAlign: 'center', borderRadius: '2px'}}>
                    <Avatar
                        style={{width: '110px', height: '110px'}}
                        src={'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'}
                    />
                </Card>
            </Col>
            <Col md={{span: 24}} lg={{span: 17}} style={{padding: '0 12px'}}>
                <Card style={{padding: '24px', textAlign: 'center', borderRadius: '2px'}}>

                </Card>
            </Col>
        </Row>
    )
}
export default UserViewComponent
