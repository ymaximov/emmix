import React from 'react'
import Layout from '../../components/Layout';
import { Form, Col, Row, Input, Button, Tabs, Card, Statistic, Calendar, theme } from "antd";
import { useNavigate, Link } from "react-router-dom";
import useGet from '../../hooks/useGet';
import { useSelector, useDispatch } from "react-redux";
import { AgGridReact } from 'ag-grid-react';
import { agGridLicense } from '../../AGGrid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { hideLoading, showLoading } from '../../redux/alertsSlice'
import CountUp from "react-countup";

export default function TenantManagement() {
    const formatter = (value) => <CountUp end={value} separator="," />;

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const companyId = useSelector((state) => state.user).user.companyId._id;

    const handleCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);
        navigate(`/bp-profile/${params.data._id}`)
      }

      const { data, isLoading, err } = useGet({
        api: `/api/propertymg/get-all-tenants/${companyId}`,
      });
      isLoading ? dispatch(showLoading()) : dispatch(hideLoading())
      if (err) return <h1>{err}</h1>;
      console.log(data, 'data')

    const columnDefs = [
        {
          headerName: "First Name",
          field: "firstName",
        },
        {
          headerName: "Last Name",
          field: "lastName",
        },
        {
          headerName: "Email Address",
          field: "email",
        },
        {
          headerName: "Phone Number",
          field: "phoneNumber",
        },
        {
          headerName: "Marital Status",
          field: "maritalStatus",
        },
        {
          headerName: "Residence",
          field: "property",
        },
        {
          headerName: "Unit No.",
          field: "unit",
        },
        // {
        //   headerName: "Phone Number",
        //   field: "phoneNumber",
        // },
        // {
        //   headerName: "Website",
        //   field: "website",
        // },
        // {
        //   title: "Actions",
        //   dataIndex: "actions",
        //   render: (text, record) => (
        //     <div className="d-flex">
        //       <Link to={`/user/bp-profile/${record._id}`} className="anchor">
        //         Edit
        //       </Link>
        //     </div>
        //   ),
        // },
      ];
  return (
    <Layout>
        <h1>Tenant Management</h1>
        <hr/>
        <Row gutter={20}>
        <Col span={12} onClick={() => navigate('/')}>
          <Statistic
            title="Tenants"
            value={data?.data.length}
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
      <Button type="primary" onClick={() => navigate("/property-management/add-tenant")}>
        Add
      </Button>
      <div className="ag-theme-alpine" style={{ height: '300px', width: '85vw' }}>
      <AgGridReact
        rowData={data?.data}
        columnDefs={columnDefs}
        onCellClicked={handleCellClicked}
        licenseKey={agGridLicense} // Replace with your AG Grid Enterprise license key
      ></AgGridReact>
    </div>
    </Layout>
  )
}
