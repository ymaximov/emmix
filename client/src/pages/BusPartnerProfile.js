import React from "react";
import Layout from "../components/Layout";
import { Form, Row, Col, Button, Input, Dropdown, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import usePost from '../hooks/usePost'
import toast from "react-hot-toast";
import axios from 'axios'
import { hideLoading, showLoading } from '../redux/alertsSlice'
import useGet from "../hooks/useGet";


export default function BusPartnerProfile() {
  const params = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companyId = useSelector((state) => state.user).user.companyId._id;
  const id = params.bpId
  const {data, isLoading, err} = useGet({api: `/api/user/bp-profile/${id}`})
  if(isLoading){ dispatch(showLoading())
  } else {dispatch(hideLoading())}
  console.log(data?.data)
  const {isLoading: loading_v2, err: err_2, onSubmit} = usePost({
    api: `/api/user/update-bp-profile/${id}`,
    method: 'put'
  })


  return data ? (
    <Layout>
      <h1>Business Partner Profile</h1>
      <hr></hr>
      <Form layout="vertical" initialValues={data?.data} onFinish={onSubmit}>
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
                <option value="Realtor">Realtor</option>
                <option value="Contractor">Contractor</option>
                <option value="Lawyer">Lawyer</option>
                <option value="Vendor">Vendor</option>
                <option value="Other">Other</option>
              </select>
            </Form.Item>
          </Col>
        </Row>
  
        <div className="d-flex justify-content-end">
          <Button className="primary-button" htmlType="submit">
            Update
          </Button>
        </div>
      </Form>
    </Layout>
  ) : "Data is loading..."
}
