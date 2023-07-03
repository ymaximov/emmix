import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import Layout from "../../components/Layout";
import { Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.get("/api/doctor/get-appointments-by-doctor-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (res.data.success) {
        setAppointments(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/doctor/change-appointment-status",
        { appointmentId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        await getAppointmentsData();
      }
    } catch (error) {
      toast.error("error changing doctor status");
      dispatch(hideLoading());
    }
  };

  const columns = [
    // {
    //     title: 'Id',
    //     dataIndex: '_id'
    // },
    {
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => (
        <span className="normal-text">
          {/* {console.log(record?.userInfo?.user?.name,"record--=-=-=-")} */}
          {record?.userInfo?.user?.name}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => (
        <span className="normal-text">{record.doctorInfo.phoneNumber}</span>
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
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {console.log(record)}
          {record.status === "pending" && (
            <div>
              <h1
                className="anchor px-0"
                onClick={() => changeAppointmentStatus(record, "approved")}
              >
                Approve
              </h1>
              <h1
                className="anchor"
                onClick={() => changeAppointmentStatus(record, "rejected")}
              >
                Reject
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAppointmentsData();
  }, []);

  return (
    <Layout>
      <h1 className="page-header">Appointments</h1>
      <hr></hr>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}
