import React, {useEffect, useState} from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, Input, TimePicker, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../../components/DoctorForm";
import { setUser  } from '../../redux/userSlice'

export default function Profile() {
    const params = useParams()
    const [doctor, setDoctor] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.user);
    const onFinish = async (values) => {
        console.log("success", values);
        try {
          dispatch(showLoading());
          const res = await axios.post("/api/doctor/update-doctor-profile", {
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

      const getDoctorData = async() => {
        try {
          dispatch(showLoading())
        //   const res = await axios.post('/api/doctor/get-doctor-info-by-user-id', 
        //   {
        //     userId: params.userId,
        //   },
        //   {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`
        //   });
        console.log(params)
        axios.get('/api/doctor/get-doctor-info-by-user-id', {
            params: {
                userId: params.userId
            },
            body: {
                userId: params.userId
            }

          })
          .then(function (response) {
            setDoctor(response.data.data)
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          dispatch(hideLoading())
        //   console.log('getting the user')
        //   console.log('rasdfd',res.data)
        //   if(res.data.success) {
            // setDoctor(res.data.data)
            // console.log("dispatched user")
            // console.log(res.data)
        //   } 
        } catch (error) {
            console.log(error);
          dispatch(hideLoading())
        }
      }
    
      useEffect(()=> {
          getDoctorData()
      }, [])
  return (
   <Layout>
        <h1 className="page-title">Doctor Profile</h1>
        <hr />
        {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor}/>}
   </Layout>
  )
}
