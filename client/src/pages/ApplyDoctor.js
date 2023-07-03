import React from "react";
import Layout from "../components/Layout";
import { Form, Row, Col, Input, TimePicker, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";

export default function ApplyDoctor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const onFinish = async (values) => {
    console.log("success", values);
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/user/apply-doctor-account", {
        ...values,
        userId: user._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,

        }
      });
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr></hr>
      <DoctorForm onFinish={onFinish}/>
    </Layout>
  );
}
