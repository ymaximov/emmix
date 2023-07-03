import React from 'react'
import Layout from '../components/Layout'
import {Col, Row, Tabs, Form, Input, Button, Table} from 'antd'
import useGet from '../hooks/useGet'
import { useNavigate, Link, useParams  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { agGridLicense } from "../AGGrid";
import { hideLoading, showLoading } from '../redux/alertsSlice'

export default function TeamManagement() {
const navigate = useNavigate()
const dispatch = useDispatch()
const id = useSelector((state) => state.user).user.companyId._id;
    const {data, isLoading, err} = useGet({ api: `/api/admin/get-all-users/${id}` })
    console.log(data)
    isLoading ? dispatch(showLoading()) : dispatch(hideLoading())
    if(err) return <h1>{err}</h1>
    
    const handleCellClicked = (params) => {
      console.log('AG GRID cell clicked', params);
      navigate(`/admin/user-profile/${params.data?._id}`)
    }

    const columnDefs = [
        {
          headerName: "Username",
          field: "email",
        },
        {
          headerName: "First Name",
          field: "firstName",
        },
        {
          headerName: "Last Name",
          field: "lastName",
        },
        {
          headerName: "Phone Number",
          field: "phone",
        },
        {
          headerName: "Account Type",
          field: "role",
        },
      ];

      // {
        //   title: "Actions",
        //   dataIndex: "actions",
        //   render: (text, record) => (
        //     <div className="d-flex">
        //       <Link to={`/admin/user-profile/${record._id}`} className="anchor">Edit</Link>
        //     </div>
        //   ),
        // },
  return (
    <Layout>
        <h1>Employee Management</h1>
        <hr />
        <Button type="primary" onClick={() => navigate(`admin/create-user/${id}`)}>
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
