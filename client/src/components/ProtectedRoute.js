import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { setUser  } from '../redux/userSlice'
import { hideLoading, showLoading } from '../redux/alertsSlice'

export default function ProtectedRoute(props) {

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getUser = async() => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/user/get-user-info-by-id', {token: localStorage.getItem('token')},
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });
      dispatch(hideLoading())
      console.log('getting the user')
      console.log('rasdfd',res.data)
      if(res.data.success) {
        dispatch(setUser(res.data))
        console.log("dispatched user")
        console.log(res.data)
      } else {
        localStorage.clear()
        navigate('/login');
      }
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear()
      navigate('/login')
    }
  }

  useEffect(()=> {
    if(!user){
      getUser()
    }
  }, [user])

    if(localStorage.getItem('token')){
        return props.children
    } else {
        return <Navigate to='/login' />
    }
}
