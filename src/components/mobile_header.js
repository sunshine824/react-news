import React from 'react';
import {Icon, message, Form, Input, Button, Modal, Tabs} from 'antd';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'
const FromItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {
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
            .then(json => {
                this.setState({
                    userNickName: json.userNickName,
                    userId: json.userId
                })
                message.error('请求成功！')
            })
            .catch(err => {
                message.error('请求失败！')
                console.log(err.message)
            });
        this.setModalVisible(false)
    };

    login() {
        this.setModalVisible(true)
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
        const { formLayout } = this.state;
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined
            ?
            <Link to={`/`}>
                <Icon type="inbox"/>
            </Link>
            :
            <Icon type="setting" onClick={this.login.bind(this)}/>
        return (
            <Router>
                <div id="mobileheader">
                    <header>
                        <img src="./images/logo.png" alt="logo"/>
                        <span>ReactNews</span>
                        {userShow}
                    </header>

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
                </div>
            </Router>
        );
    };
}
export default MobileHeader = Form.create({})(MobileHeader)