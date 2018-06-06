import React, { PureComponent } from 'react';
import { routerRedux } from 'dva/router';
import { createBrowserHistory } from 'history';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'dva';
import {
  Row,
  Col,
  Form,
  Card,
  Select,
  Icon,
  Avatar,
  List,
  Tooltip,
  Dropdown,
  Menu,
  Input,
  Button,
  Progress,
  InputNumber,
  DatePicker,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
//ranAdd
const { Search } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;

@Form.create()
@connect(({report, loading }) => ({
    report,
    loading: loading.models.report,
}))
export default class CampiagnReport extends PureComponent {
    state = {};

    componentDidMount() {
        this.props.dispatch({
            type: 'report/fetch',
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { report } = this.props;
        const { dataList,total,pageCount} = report;

        const columns = [
        {
            title: 'Campaign',
            dataIndex: 'campaign_id',
        },
        {
            title: 'Clicks',
            dataIndex: 'clks',
        },
        {
            title: 'Conversions',
            dataIndex: 'convs',
        },
        {
            title: 'CVR%',
            dataIndex: 'cvr',
        },
        {
            title: 'Fraud%',
            dataIndex: 'faud',
        },
        {
            title: 'KPI%',
            dataIndex: 'kpi',
        },
        {
            title: 'KPI Required%',
            dataIndex: 'kpi_req',
        }
        ];

        return (
        <div>
            <PageHeaderLayout />
            <Card bordered={false} style={{marginTop:30}}>
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                    <FormItem label="Date Range">
                    {getFieldDecorator('date')(
                        <RangePicker style={{ width: '250px' }}/>
                    )}
                    </FormItem>
                </Col>
                <Col md={8} sm={24}>
                    <FormItem label="Campaign">
                    {getFieldDecorator('status3')(
                        <Select placeholder="请选择" style={{ width: '182px' }}>
                        <Option value="0">123021</Option>
                        <Option value="1">122302</Option>
                        </Select>
                    )}
                    </FormItem>
                </Col>
                <span style={{ float: 'right', marginBottom: 24 }}>
                    <Button type="primary" htmlType="submit">
                    Query
                    </Button>
                </span>
                </Row>
            </Form>
            <Table columns={columns} dataSource={dataList} bordered />
            </Card>
        </div>
        );
    }
}
