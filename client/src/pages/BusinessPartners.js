import React from "react";
import Layout from "../components/Layout";
import { Table, Button } from "antd";
import { useNavigate, Link } from "react-router-dom";
import useGet from "../hooks/useGet";
import { useSelector, useDispatch } from "react-redux";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { agGridLicense } from "../AGGrid";
import { hideLoading, showLoading } from '../redux/alertsSlice'
import { render } from "react-dom";


export default function BusinessPartners() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const id = useSelector((state) => state.user).user.companyId._id;
  // const [rowData, setRowData] = useState([]);

  const { data, isLoading, err } = useGet({
    api: `/api/user/get-all-business-partners/${id}`,
  });
  isLoading ? dispatch(showLoading()) : dispatch(hideLoading())
  if (err) return <h1>{err}</h1>;
  console.log(data, 'data')
  
  const handleCellClicked = (params) => {
    console.log('AG GRID cell clicked', params);
    navigate(`/bp-profile/${params.data._id}`)
  }
  const columnDefs = [
    {
      headerName: "Company Name",
      field: "bpCompanyName",
    },
    {
      headerName: "Contact First Name",
      field: "firstName",
    },
    {
      headerName: "Contact Last Name",
      field: "lastName",
    },
    {
      headerName: "Contact Email",
      field: "email",
    },
    {
      headerName: "Partner Type",
      field: "BPType",
    },
    {
      headerName: "Phone Number",
      field: "phoneNumber",
    },
    {
      headerName: "Website",
      field: "website",
    },
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
  console.log(data);

  
  return (
    <Layout>
      <h1>Business Partners</h1>
      <Button type="primary" onClick={() => navigate("/add-business-partner")}>
        Add
      </Button>
      {/* <Table columns={columns} dataSource={data} /> */}
      <div className="ag-theme-alpine" style={{ height: '300px', width: '85vw' }}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        onCellClicked={handleCellClicked}

      ></AgGridReact>
    </div>
    </Layout>
  );
}
