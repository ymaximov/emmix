import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { Form, Col, Row, Input, Button, Tabs, Card, Statistic, Calendar, theme } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Doctor from "../components/Doctor";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import CountUp from "react-countup";
const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

export default function Home() {
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const formatter = (value) => <CountUp end={value} separator="," />;

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const getData = async () => {
    try {
      const res = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
      dispatch(setUser(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getHomePageData = async () => {
    try {
      dispatch(showLoading);
      const res = await axios.get("/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (res.data.success) {
        setDoctors(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getHomePageData();
  }, []);

  return (
    <Layout>
      <h1>Dashboard</h1>
      <hr></hr>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={true}>
            <Statistic
              title="Revenue This Month"
              value={1103.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="$"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={true}>
            <Statistic
              title="Loss This Month"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="$"
            />
          </Card>
        </Col>
      </Row>
      <hr />
      <Row gutter={20}>
        <Col span={12}>
          <Statistic
            title="Properties"
            value={4}
            formatter={formatter}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Tenants"
            value={3}
            precision={2}
            formatter={formatter}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Overdue Rent"
            value={3}
            precision={2}
            formatter={formatter}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Contract Ending (90 Days)"
            value={3}
            precision={2}
            formatter={formatter}
          />
        </Col>
      </Row>
      <hr />
      <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
    </Layout>
  );
}
