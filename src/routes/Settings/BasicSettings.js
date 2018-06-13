import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import {
    Row,
    Col,
    Card,
    Button,
    Tabs,
    DatePicker,
    message,
    Form,
    Input,
} from 'antd';

import {changePassword} from '../../services/api';
//ranAdd
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import { setAuthority } from '../../utils/authority';
import { reloadAuthorized } from '../../utils/Authorized';

import Ellipsis from 'components/Ellipsis';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

@Form.create()
export default class BasicSettings extends Component {
    state = {};

    componentDidMount() {}

    componentWillUnmount() {}

    //表单提交
    changePassword = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const response = changePassword(values);
                response.then((res) => {
                    return res;
                }).then((json) => {
                    console.log(json);
                    if(json.code!==undefined && json.code!==null){
                        if(json.code == 0){
                            message.success('Password modification success');
                        }else if(json.code == 1){
                            sessionStorage.removeItem('loginUserInfo');
                            setAuthority('guest');
                            reloadAuthorized();
                            routerRedux.push('/user/login');
                        }else{
                            message.error(json.info);
                        }
                    }
                })
            }
        });
    }

    //检查输入的新密码
    checkPassword = (rule, value, callback) => {
        if (value && value.length < 6) {
            callback('The length is at least 6 characters!');
        }else{
            callback();
        }
    };

    //确认再次输入的密码与原密码相同
    checkConfirm = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('new_pwd')) {
            callback('Two inputted password mismatches!');
        } else {
            callback();
        }
    };

    //取消
    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <PageHeaderLayout>
                <Card title="Change Password" bordered={false} style={{ marginTop: 32, padding: 0 }}>
                    <Form onSubmit={this.changePassword}>
                        <Row gutter={24}>
                            <Col span={6}>
                                <FormItem label="Old Password">
                                {getFieldDecorator('old_pwd', {
                                    rules: [
                                    {
                                        required: true,
                                        message: 'This is required',
                                    },
                                    ],
                                })(<Input placeholder="Input your old password" type="password"/>)}
                                </FormItem>
                            </Col>
                            <Col span={6} offset={2}>
                                <FormItem label="New Password">
                                {getFieldDecorator('new_pwd', {
                                    rules: [
                                    {
                                        required: true,
                                        message: 'This is required',
                                    },{
                                        validator:this.checkPassword
                                    }
                                    ],
                                })(<Input placeholder="Input new password" type="password"/>)}
                                </FormItem>
                            </Col>
                            <Col span={6} offset={2}>
                                <FormItem label="Repeat Password">
                                {getFieldDecorator('repeat_pwd', {
                                    rules: [
                                    {
                                        required: true,
                                        message: 'This is required',
                                    },
                                    {
                                        validator: this.checkConfirm,
                                    },
                                    ],
                                })(<Input placeholder="Repeat new password" type="password"/>)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6} offset={16}>
                                <Button type="primary" htmlType="submit" style={{marginRight:20}}>Save</Button>
                                <Button onClick={this.handleReset}>Cancel</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </PageHeaderLayout>
        );
    }
}
