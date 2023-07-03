import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import {
  Form,
  Col,
  Row,
  Input,
  Button,
  Tabs,
  Card,
  Statistic,
  Calendar,
  theme,
} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Doctor from "../components/Doctor";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import CountUp from "react-countup";
import useGet from "../hooks/useGet";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  // const companyId = useSelector((state) => state.user).user.companyId._id;
  const { user } = useSelector((state) => state.user);
  console.log(user?.companyId._id);
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const formatter = (value) => <CountUp end={value} separator="," />;
  const navigate = useNavigate();


//  const getTenants = async () => {
//   try {
//     const res = await axios.get(
//       `/api/propertymg/get-all-tenants/${user?.companyId._id}`,
//       {},
//       {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       }
//     );
//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
//  }

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

  const { data: tenants, isLoading, err } = useGet({
    api: `/api/propertymg/get-all-tenants/${user?.companyId._id}`,
  });
  isLoading ? dispatch(showLoading()) : dispatch(hideLoading())
  if (err) return <h1>{err}</h1>;
  console.log(tenants, 'data')

  useEffect(() => {
    getHomePageData();
    getData();
    // getTenants()
  }, []);

  //Dashboard

  //tenant amount
  // const { data: tenants, isLoading: tenantsLoading, err: tentantsError } = useGet({
  //   api: `/api/propertymg/get-all-tenants/${companyId}`,
  // });
  // tenantsLoading ? dispatch(showLoading()) : dispatch(hideLoading())
  // if (tentantsError) return <h1>{tentantsError}</h1>;
  // console.log(tenants, 'Tenants data')

  return (
    <Layout>
      <h1>Dashboard</h1>
      <hr></hr>
      <div className="quick-actions">
        <Button type="primary" onClick={() => navigate("add-business-partner")}>
          New Partner
        </Button>
        <Button type="primary">New Property</Button>
        <Button
          type="primary"
          onClick={() => navigate("/property-management/add-tenant")}
        >
          New Tenant
        </Button>
        <Button type="primary">New PO</Button>
        <Button type="primary">New Payment</Button>
        <Button type="primary">New Contract</Button>
      </div>
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
          <Statistic title="Properties" value={4} formatter={formatter} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Tenants"
            value={tenants?.data.length}
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
      <Row>
        <Col>
          <div style={wrapperStyle}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} onSelect={(e) => console.log(e)} onClick={() => alert('hi')}/>
          </div>
        </Col>
        <Col>\</Col>
      </Row>
    </Layout>
  );
}
