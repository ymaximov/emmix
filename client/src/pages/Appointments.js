import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import Layout from "../components/Layout";
import { Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();
    const getAppointmentsData = async () => {
      try {
        dispatch(showLoading());
        const res = await axios.get("/api/user/get-appointments-by-user-id", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(hideLoading());
        if (res.data.success) {
          setAppointments(res.data.data);
        }
      } catch (error) {
        dispatch(hideLoading());
      }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id'
        },
        {
          title: "Doctor",
          dataIndex: "name",
          render: (text, record) => (
            <span className="normal-text">
              {record.doctorInfo.firstName} {record.doctorInfo.lastName}
            </span>
          ),
        },
        {
          title: "Phone",
          dataIndex: "phoneNumber",
          render: (text, record) => (
            <span className="normal-text">
              {record.doctorInfo.phoneNumber}
            </span>
          ),
        },
        {
          title: "Date & Time",
          dataIndex: "createdAt",
          render: (text, record) => (
            <span className="normal-text">
              {record.date} {record.time}
            </span>
          ),
        },
        {
            title: 'Status',
            dataIndex: 'status'
        }
      ];
    
    useEffect(() => {
        getAppointmentsData();
      }, []);

    return (
        <Layout>
        <h1 className="page-title">Appointments</h1>
        <hr />
        <Table columns={columns} dataSource={appointments} />
      </Layout>
  )
}
