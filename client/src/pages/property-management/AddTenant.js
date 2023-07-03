import React from 'react'
import Layout from "../../components/Layout";
import { Form, Row, Col, Button, Input, Table, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import usePost from '../../hooks/usePost';
import toast from "react-hot-toast";
import axios from 'axios'

export default function AddTenant() {
    const companyId = useSelector((state) => state.user).user.companyId._id;
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log("received values of form", values);
        try {
          values.companyId = companyId
          const res = await axios.post("/api/propertymg/create-tenant", values, 
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
        <h1>Add New Tenant</h1>
        <hr />
        <Tabs>
        <Tabs.TabPane tab="Tenant Details" key={0}>
        <Form layout="vertical" onFinish={onFinish}>
        <h1 className="card-title mt-3">Tenant details</h1>
        <Row>
        <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              label="Social Security No."
              name="socialSecurity"
              rules={[{ require: false }]}
            >
              <Input placeholder="Social Security No." type="password"></Input>
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
              label="Employer Name"
              name="employer"
              rules={[{ require: false }]}
            >
              <Input placeholder="Website"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              label="Job Title"
              name="jobTitle"
              rules={[{ require: false }]}
            >
              <Input placeholder="Address"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              name='BPType'
              label="Marital Status"
              rules={[{ require: true }]}
            >
              {/* <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
                Select from dropdown
              </Dropdown.Button> */}
              <select className="bp-type" name="BPType">
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
        <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              name='property'
              label="Property"
              rules={[{ require: false }]}
            >
              {/* <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
                Select from dropdown
              </Dropdown.Button> */}
              <select className="bp-type" name="property">
                {/* <option value="single">Single</option>
                <option value="married">Married</option> */}
              </select>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              name='unit'
              label="Unit"
              rules={[{ require: false }]}
            >
              {/* <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
                Select from dropdown
              </Dropdown.Button> */}
              <select className="bp-type" name="unit">
                {/* <option value="single">Single</option>
                <option value="married">Married</option> */}
              </select>
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button className="primary-button" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Payment Information" key={1}>
        <Form layout="vertical" onFinish={onFinish}>
        <h1 className="card-title mt-3">Payment Information</h1>
        <Row>
        <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              label="Social Security No."
              name="socialSecurity"
              rules={[{ require: false }]}
            >
              <Input placeholder="Social Security No." type="password"></Input>
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
              label="Employer Name"
              name="employer"
              rules={[{ require: false }]}
            >
              <Input placeholder="Website"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              label="Job Title"
              name="jobTitle"
              rules={[{ require: false }]}
            >
              <Input placeholder="Address"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              name='BPType'
              label="Marital Status"
              rules={[{ require: true }]}
            >
              {/* <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
                Select from dropdown
              </Dropdown.Button> */}
              <select className="bp-type" name="BPType">
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
        <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              name='property'
              label="Property"
              rules={[{ require: false }]}
            >
              {/* <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
                Select from dropdown
              </Dropdown.Button> */}
              <select className="bp-type" name="property">
                {/* <option value="single">Single</option>
                <option value="married">Married</option> */}
              </select>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              name='unit'
              label="Unit"
              rules={[{ require: false }]}
            >
              {/* <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
                Select from dropdown
              </Dropdown.Button> */}
              <select className="bp-type" name="unit">
                {/* <option value="single">Single</option>
                <option value="married">Married</option> */}
              </select>
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button className="primary-button" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tenant Screening" key={2}></Tabs.TabPane>
        {/* <Tabs.TabPane tab="Property Details" key={3}></Tabs.TabPane> */}
      </Tabs>

    </Layout>
  )
}
