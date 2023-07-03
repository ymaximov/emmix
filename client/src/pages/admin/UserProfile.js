import React from 'react'
import Layout from '../../components/Layout'
import { useParams } from 'react-router-dom'
import useGet from '../../hooks/useGet'
import { Form, Col, Row, Input, Button } from 'antd'
import usePost from '../../hooks/usePost'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../../redux/alertsSlice'

export default function UserProfile() {
    const dispatch = useDispatch()
    const id = useParams().userId
    const {data, isLoading, err} = useGet({api: `/api/admin/user-profile/${id}`})
    if(isLoading){ dispatch(showLoading())
    } else {dispatch(hideLoading())}
    console.log(data);
    const {isLoading: loading_v2, err: err_3, onSubmit} = usePost({
      api: `/api/admin/update-user-profile/${id}`,
      method: 'put'
    })

  return data ? (
    <Layout>
       <h1>User Account Profile</h1>
      <hr></hr>
             <Form layout="vertical" onFinish={onSubmit} initialValues={data}>
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
            Update
          </Button>
        </div>
      </Form>

    </Layout>
  ) : 'Data is Loading'
}
