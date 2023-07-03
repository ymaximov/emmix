import React from "react";
import Layout from "../components/Layout";
import { Table, Button } from "antd";
import { useNavigate, Link } from "react-router-dom";
import useGet from "../hooks/useGet";
import { useSelector } from "react-redux";

export default function ClientManagement() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user).user.companyId._id;
  const { data, isLoading, err } = useGet({
    api: `/api/user/get-all-clients/${id}`,
  });
  if (isLoading) return "Loading...";
  if (err) return <h1>{err}</h1>;
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Email Address",
      dataIndex: "email",
    },
    {
        title: "Client Type",
        dataIndex: "clientType",
      },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <Link to={`/user/client-profile/${record._id}`} className="anchor">
            Edit
          </Link>
        </div>
      ),
    },
  ];
  console.log(data);
  return (
    <Layout>
      <h1>Client Management</h1>
      <Button type="primary" onClick={() => navigate("/add-client")}>
        Add
      </Button>
      <Table columns={columns} dataSource={data} />
    </Layout>
  );
}
