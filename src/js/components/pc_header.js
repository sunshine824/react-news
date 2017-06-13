/**
 * Created by Gatsby on 2017/6/13.
 */
import React from 'react';
import {Row, Col, Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import ReactDOM from 'react-dom';

export default class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top'
        }
    };

    handleClick(e) {
        this.setState({
            current: e.key
        })
    };

    render() {
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
                        </Menu>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    };
}