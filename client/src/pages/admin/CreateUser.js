import React from "react";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Input, Form, Row, Col, Button } from "antd";

export default function CreateUser() {
  const navigate = useNavigate();
  const companyId = useParams().companyId;
  const onFinish = async (values) => {
    console.log("received values of form", values);
    try {
      values.companyId = companyId
      const res = await axios.post("/api/user/register", values);

      if (res.data.success) {
        toast.success(res.data.message);
        toast("Redirecting to login page");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <h1>Create user account</h1>
      <hr />
      <Form layout="vertical" onFinish={onFinish}>
        <h1 className="card-title mt-3">Personal Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="First Name"
              name="firstName"
              rules={[{ require: true }]}
            >
              <Input placeholder="First Name"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Last Name"
              name="lastName"
              rules={[{ require: true }]}
            >
              <Input placeholder="Last Name"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Phone Number"
              name="phone"
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
              label="Password"
              name="password"
              rules={[{ require: true }]}
            >
              <Input placeholder="Password" type="password"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Password Hint"
              name="passwordHint"
              rules={[{ require: true }]}
            >
              <Input placeholder="Password Hint"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Form.Item
          required
          label="User Role"
          name='role'
          className="role-label"
          >
            <select className="user-role" name="userRole">
              <option value="Super User">Super User</option>
              <option value="Professional User">Professional User</option>
            </select>
          </Form.Item>
        </Row>

        <div className="d-flex justify-content-end">
          <Button className="primary-button" htmlType="submit">
            SUBMIT
          </Button>
        </div>
      </Form>
    </Layout>
  );
}
