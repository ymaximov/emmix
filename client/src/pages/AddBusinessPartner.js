import React from "react";
import Layout from "../components/Layout";
import { Form, Row, Col, Button, Input, Dropdown, message } from "antd";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import usePost from '../hooks/usePost'
import toast from "react-hot-toast";
import axios from 'axios'


export default function AddBusinessPartner() {
  const navigate = useNavigate();
  const dispatch = useDispatch;
  const companyId = useSelector((state) => state.user).user.companyId._id;

  const onFinish = async (values) => {
    console.log("received values of form", values);
    try {
      values.companyId = companyId
      const res = await axios.post("/api/user/create-business-partner", values, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,

        }
      });
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1>Add new business partner</h1>
      <hr></hr>
      <Form layout="vertical" onFinish={onFinish}>
        <h1 className="card-title mt-3">Partner details</h1>
        <Row>
        <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              label="Company Name"
              name="bpCompanyName"
              rules={[{ require: false }]}
            >
              <Input placeholder="Company Name"></Input>
            </Form.Item>
          </Col>
        </Row>
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
              <Input placeholder="Phone Number"></Input>
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
          <Col>
            <Form.Item
              required
              name='BPType'
              label="Partner Type"
              rules={[{ require: true }]}
            >
              {/* <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
                Select from dropdown
              </Dropdown.Button> */}
              <select className="bp-type" name="BPType">
                <option value="realtor">Realtor</option>
                <option value="contractor">Contractor</option>
                <option value="lawyer">Lawyer</option>
                <option value="service-provider">Vendor</option>
                <option value="other">Other</option>
              </select>
            </Form.Item>
          </Col>
        </Row>
        {/* <Row gutter={20}>
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
        </Row> */}
        <div className="d-flex justify-content-end">
          <Button className="primary-button" htmlType="submit">
            SUBMIT
          </Button>
        </div>
      </Form>
    </Layout>
  );
}
