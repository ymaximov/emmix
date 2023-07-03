import React from 'react'
import { Form, Row, Col, Button, Input } from 'antd'

export default function DoctorForm({onFinish, initialValues}) {
  return (
    <div>
          <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
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
              name="phoneNumber"
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
        </Row>
        <hr></hr>
        <h1 className="card-title mt-3">Professional Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Specialization"
              name="specialization"
              rules={[{ require: true }]}
            >
              <Input placeholder="Specialization"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Experience"
              name="experience"
              rules={[{ require: true }]}
            >
              <Input placeholder="Experience" type="number"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Fee Per Consultation"
              name="feePerConsultation"
              rules={[{ require: true }]}
            >
              <Input placeholder="Fee Per Consultation" type="number"></Input>
            </Form.Item>
          </Col>
          {/* <Col>
            <Form.Item
              className="p-2"
              name="time-picker" label="TimePicker" 
            >
              <TimePicker.RangePicker format='HH:mm' />
            </Form.Item>
          </Col> */}
        </Row>

        <div className="d-flex justify-content-end">
          <Button className="primary-button" htmlType="submit">
            SUBMIT
          </Button>
        </div>
      </Form>
    </div>
  )
}
