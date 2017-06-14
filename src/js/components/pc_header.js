/**
 * Created by Gatsby on 2017/6/13.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Menu, Icon, message, Form, Input, Button, Checkbox, Modal, Tabs} from 'antd';
const FromItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'Login',
            hasLogined: false,
            userNickName: '',
            userId: 0
        }
    };

    handleClick(e) {
        if (e.key == "register") {
            this.setState({current: 'register'})
            this.setModalVisible(true)
        } else {
            this.setState({current: e.key})
        }
    };

    setModalVisible(value) {
        //console.log(value)
        this.setState({
            modalVisible: value
        })
    };

    handleSubmit(e) {
        e.preventDefault();
        var formData = '';
        var myFetchOptions = {
            method: 'GET',
        };
        this.props.form.validateFields((err, values) => {
            if (!err) {
                formData = values
            }
        });
        fetch('url', myFetchOptions)
            .then(res => {
                res.json()
            })
            .then(json=>{
                this.setState({
                    userNickName:json.userNickName,
                    userId:json.userId
                })
                message.error('请求成功！')
            })
            .catch(err=>{
                message.error('请求失败！')
                console.log(err.message)
            });
            this.setModalVisible(false)
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined
            ?
            <Menu.Item key="logout" class="register">
                <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Link target="_blank">
                    <Button type="dashed" htmlType="button">个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button ghost htmlType="button">退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register" class="register">
                <Icon type="appstore" style={{paddingRight: '8px'}}></Icon>
                注册/登录
            </Menu.Item>;

        const menu = [
            {key: 'top', icon: 'appstore', title: '头条'},
            {key: 'shihui', icon: 'appstore', title: '社会'},
            {key: 'guonei', icon: 'appstore', title: '国内'},
            {key: 'guoji', icon: 'appstore', title: '国际'},
            {key: 'yule', icon: 'appstore', title: '娱乐'},
            {key: 'tiyu', icon: 'appstore', title: '体育'},
            {key: 'keji', icon: 'appstore', title: '科技'},
            {key: 'shishang', icon: 'appstore', title: '时尚'},
        ]
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src="./src/images/logo.png" alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]}
                              onClick={this.handleClick.bind(this)}>
                            {
                                menu.map(item => {
                                    return <Menu.Item key={item.key}>
                                        <Icon type={item.icon}/>
                                        {item.title}
                                    </Menu.Item>
                                })
                            }
                            {userShow}
                        </Menu>

                        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
                               onCancel={this.setModalVisible.bind(this, false)}
                               onOk={this.setModalVisible.bind(this, false)}
                               okText="关闭" cancelText="取消">
                            <Tabs type="card">
                                <TabPane tab="注册" key="2">
                                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                        <FromItem label="账户">
                                            {getFieldDecorator('r_userName', {
                                                rules: [{required: true, message: '请输入您的账号!'}],
                                            })(
                                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder="请输入您的账号"/>
                                            )}
                                        </FromItem>
                                        <FromItem label="密码">
                                            {getFieldDecorator('r_password', {
                                                rules: [{required: true, message: '请输入您的密码!'}],
                                            })(
                                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                       type="password" placeholder="请输入您的密码"/>
                                            )}
                                        </FromItem>
                                        <FromItem label="确认密码">
                                            {getFieldDecorator('r_confirmPassword', {
                                                rules: [{required: true, message: '请确认您的密码!'}],
                                            })(
                                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                       type="password" placeholder="请确认您的密码"/>
                                            )}
                                        </FromItem>
                                        <Button type="primary" htmlType="submit">注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    };
}

export default PCHeader = Form.create({})(PCHeader)