import React from 'react'
import Layout from '../../components/Layout'
import useGet from '../../hooks/useGet';
import {Table, Button} from 'antd'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Portfolio() {
    const id = useSelector((state) => state.user).user.companyId._id;
    const navigate = useNavigate()
    const { data, isLoading, err } = useGet({
        api: `/api/user/get-all-business-partners/${id}`,
      });
      if (isLoading) return "Loading...";
      if (err) return <h1>{err}</h1>;

    const columns = [
        {
          title: "Company Name",
          dataIndex: "bpCompanyName",
        },
        {
          title: "Partner Type",
          dataIndex: "BPType",
        },
        {
          title: "Phone Number",
          dataIndex: "phoneNumber",
        },
        {
          title: "Website",
          dataIndex: "website",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              <Link to={`/user/bp-profile/${record._id}`} className="anchor">
                Edit
              </Link>
            </div>
          ),
        },
      ];
  return (
    <Layout>
        <h1>Portfolio</h1>
        <hr/>
        <Button type="primary" onClick={() => navigate('/property-management/portfolio/add-new-property')}>
        Add
      </Button>
        <Table columns={columns} dataSource={data} />
    </Layout>
  )
}
