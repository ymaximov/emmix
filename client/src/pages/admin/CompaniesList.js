import React from "react";
import Layout from "../../components/Layout";
import { Table } from "antd";
import { Link } from "react-router-dom";
import useGet from "../../hooks/useGet";

export default function CompaniesList() {
    const {data, isLoading, err} = useGet({api: '/api/admin/get-all-companies' })
    if(err) return <h1>{err}</h1>
    if(isLoading) return "Loading ..."
  console.log(data);
    const columns = [
        {
          title: "VAT/Tax ID",
          dataIndex: "taxId",
        },
        {
          title: "Company Name",
          dataIndex: "companyName",
        },
        {
          title: "Address",
          dataIndex: "address",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
          },
          {
            title: "Created On",
            dataIndex: "createdAt",
          },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, company) => (
            <div className="d-flex">
              <Link to={`/admin/company-profile/${company._id}`} className="anchor">Edit</Link>
            </div>
          ),
        },
      ];
      
  return (
    <Layout>
        <h1></h1>
        <Table columns={columns} dataSource={data}/>
    </Layout>
  )
}
