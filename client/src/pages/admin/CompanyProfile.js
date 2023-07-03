import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, Button, Input, Table, Tabs } from "antd";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";

export default function CompanyProfile() {
  const navigate = useNavigate();
  const id = useParams().companyId;
  const { data, isLoading, err } = useGet({ api: `/api/admin/company/${id}` });
  const {data: users, isLoading: loading, err: err_2} = useGet({ api: `/api/admin/get-all-users/${id}` })
  const {isLoading: loading_v2, err: err_3, onSubmit} = usePost({
    api: `/api/admin/update-company-profile/${id}`,
    method: 'put'
  })
  console.log(err_3);
  const [user, setUser] = useState();
  if (err || err_2) return <h1>{err || err_2}</h1>;
  if (isLoading || loading) return "Loading ...";
  

  const columns = [
    {
      title: "Username",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => record.firstName + ' ' +record.lastName
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Account Type",
      dataIndex: "role",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <Link to={`/admin/user-profile/${record._id}`} className="anchor">Edit</Link>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <Tabs>
        <Tabs.TabPane tab="Company Information" key={0}>
          <div>
          <Form layout="vertical" onFinish={onSubmit} initialValues={data}>
        <h1 className="card-title mt-3">Company Details</h1>
        <Row gutter={20}>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="VAT/Tax ID"
              name="taxId"
              rules={[{ require: true }]}
            >
              <Input placeholder="VAT/Tax ID"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Company Name"
              name="companyName"
              rules={[{ require: true }]}
            >
              <Input placeholder="Company Name"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Main Contact Name"
              name="mainContact"
              rules={[{ require: true }]}
            >
              <Input placeholder="Main Contact Name"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Phone Number"
              name="phoneNumber"
              rules={[{ require: true }]}
            >
              <Input placeholder="Phone Number"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Email Address"
              name="email"
              rules={[{ require: true }]}
            >
              <Input placeholder="Email Address"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Website"
              name="website"
              rules={[{ require: true }]}
            >
              <Input placeholder="Website"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Address"
              name="address"
              rules={[{ require: true }]}
            >
              <Input placeholder="Address"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row>
        </Row>
        <div className="d-flex justify-content-end">
          <Button loading={loading_v2} disabled={loading_v2} className="primary-button" htmlType="submit">
            Update
          </Button>
        </div>
      </Form>
          </div>
          {user?.user.unseenNotifications.map((notification, index) => {
            console.log(notification);
            return (
              <div className="card p-3" key={index}>
                <div className="card-text"></div>
              </div>
            );
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Billing Information" key={1}></Tabs.TabPane>
        <Tabs.TabPane tab="User Accounts" key={2}>
          <div>
            <h1 className="card-title mt-3 p-3">User accounts</h1>
            <hr />
            <Button className="primary-button" onClick={() => navigate(`/admin/create-user/${id}`)}>Add</Button>
            <Table columns={columns} dataSource={users.data} />
          </div>
          {user?.user.seenNotifications.map((notification, index) => {
            console.log(notification);
            return (
              <div
                className="card p-3"
                onClick={() => navigate(notification.onclickPath)}
                key={index}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            );
          })}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}
