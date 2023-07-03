import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Form, Row, Col, Input, TimePicker, Button, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default function BookAppointment() {
  const dispatch = useDispatch();
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      console.log(params);
      axios
        .get("/api/doctor/get-doctor-info-by-id", {
          params: {
            doctorId: params.doctorId,
          },
        })
        .then(function (response) {
          setDoctor(response.data.data);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  const onChange = (time, timeString) => {
    console.log(time, timeString);
    setTime(timeString);
  };

  const bookNow = async () => {
    try {
      dispatch(showLoading());
      console.log(params);
      console.log(date, "datelakj");
      const res = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} align='middle'>
          <Col span={8} sm={24} xs={24} lg={8}>
              <div
                className="p-2 cursor-pointer doctor"
                onClick={() => navigate(`/book-appointment/${doctor._id}`)}
              >
                <p>
                  <b>Phone Number: </b>
                  {doctor.phoneNumber}
                </p>
                <p>
                  <b>Address: </b>
                  {doctor.address}
                </p>
                <p>
                  <b>Fee Per Visit: </b>
                  {doctor.feePerConsultation}
                </p>
              </div>
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <div className="d-flex flex-column mp-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(date, dateString) => setDate(dateString)}
                />
                <TimePicker
                  onChange={onChange}
                  defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                />
                <Button
                  className="primary-button mt-3 full-width-button"
                  onClick={bookNow}
                >
                  Book Now
                </Button>
              </div>
            </Col>
           
          </Row>
        </div>
      )}
    </Layout>
  );
}
