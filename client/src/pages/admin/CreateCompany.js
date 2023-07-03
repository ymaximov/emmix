import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, Button, Input, Space } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import axios from 'axios'
import toast from "react-hot-toast";

export default function CreateCompany() {
    const dispatch = useDispatch()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const onFinish = async (values) => {
    console.log("received values of form", values);
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/admin/create-company", values);
      dispatch(hideLoading())
      if (res.data.success){
        toast.success(res.data.message);
        // navigate()
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong");
    }
  }
  return (
    <Layout>
      <h1>Onboard new company</h1>
      <Form layout="vertical" onFinish={onFinish}>
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
        <hr></hr>
        <h1 className="card-title mt-3">Billing Information</h1>
        <Row gutter={20}>
          
          
      
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
