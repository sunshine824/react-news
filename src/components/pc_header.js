/**
 * Created by Gatsby on 2017/6/13.
 */
import React,{Component} from 'react';
import Mock from 'mockjs';
import {Row, Col, Menu, Icon, message, Form, Input, Button, Modal, Tabs} from 'antd';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'
const FromItem = Form.Item;
const TabPane = Tabs.TabPane;

Mock.mock('/api/login', {
    data: {
        userNickName: 'sunshine824',
        userId: 0
    }
})

class PCHeader extends Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'Login',
            hasLogined: false,
            userNickName: '',
            userId: 0,
            formLayout: 'horizontal',
        }
    };

    componentWillMount() {
        if (localStorage.userId != undefined) {
            //渲染组件之前初始化用户信息，刷新页面依然显示登录状态
            this.setState({hasLogined: true});
            this.setState({userNickName: localStorage.userNickName, userId: localStorage.userId})
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
        let formData = '';
        this.props.form.validateFields((err, values) => {
            if (!err) {
                formData = values
            }
        });
        const myFetchOptions = {
            method: 'POST',
            mode: "no-cors",
            body: JSON.stringify({
                userNickName: formData.userName,
                password: formData.password
            }),
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        fetch('/api/login', myFetchOptions)
            .then(res => {
                res.json()
            })
            .then(json => {
                this.setState({
                    userNickName: json.userNickName,
                    userId: json.userId
                })
                //请求成功后储存用户信息
                localStorage.userid = json.UserId;
                localStorage.userNickName = json.NickUserName;
                message.error('请求成功！')
            })
            .catch(err => {
                message.error('请求失败！')
                console.log(err.message)
            });
        this.setModalVisible(false)
    };

    callback(key) {
        key == 1 ? this.setState({action: 'login'}) : this.setState({action: 'register'})
    };

    logout() {
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({hasLogined: false});
    };

    render() {
        const {formLayout} = this.state;
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined
            ?
            <Menu.Item key="logout" className="register">
                <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Link target="_blank">
                    <Button type="dashed" htmlType="button">个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button ghost htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register" className="register">
                <Icon type="appstore" style={{paddingRight: '8px'}}></Icon>
                注册/登录
            </Menu.Item>;

        const menu = [
            {key: 'war', icon: 'appstore', title: '军事'},
            {key: 'sport', icon: 'appstore', title: '体育'},
            {key: 'tech', icon: 'appstore', title: '科技'},
            {key: 'edu', icon: 'appstore', title: '教育'},
            {key: 'ent', icon: 'appstore', title: '娱乐'},
            {key: 'gupiao', icon: 'appstore', title: '股票'},
            {key: 'travel', icon: 'appstore', title: '旅游'},
            {key: 'money', icon: 'appstore', title: '财经'},
        ]
        return (
            <Router>
                <header>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={4}>
                            <a href="/" className="logo">
                                <img src="./images/logo.png" alt="logo"/>
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
                                <Tabs type="card" onChange={this.callback.bind(this)}>
                                    <TabPane tab="登录" key="1">
                                        <Form layout={formLayout} onSubmit={this.handleSubmit.bind(this)}>
                                            <FromItem label="账户">
                                                {getFieldDecorator('userName', {
                                                    rules: [{required: false, message: '请输入您的账号!'}],
                                                })(
                                                    <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                           placeholder="请输入您的账号"/>
                                                )}
                                            </FromItem>
                                            <FromItem label="密码">
                                                {getFieldDecorator('password', {
                                                    rules: [{required: false, message: '请输入您的密码!'}],
                                                })(
                                                    <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                           type="password" placeholder="请输入您的密码"/>
                                                )}
                                            </FromItem>
                                            <Button type="primary" htmlType="submit">登录</Button>
                                        </Form>
                                    </TabPane>
                                    <TabPane tab="注册" key="2">
                                        <Form layout={formLayout} onSubmit={this.handleSubmit.bind(this)}>
                                            <FromItem label="账户">
                                                {getFieldDecorator('r_userName', {
                                                    rules: [{required: false, message: '请输入您的账号!'}],
                                                })(
                                                    <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                           placeholder="请输入您的账号"/>
                                                )}
                                            </FromItem>
                                            <FromItem label="密码">
                                                {getFieldDecorator('r_password', {
                                                    rules: [{required: false, message: '请输入您的密码!'}],
                                                })(
                                                    <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                           type="password" placeholder="请输入您的密码"/>
                                                )}
                                            </FromItem>
                                            <FromItem label="确认密码">
                                                {getFieldDecorator('r_confirmPassword', {
                                                    rules: [{required: false, message: '请确认您的密码!'}],
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
            </Router>
        );
    };
}

export default PCHeader = Form.create({})(PCHeader)