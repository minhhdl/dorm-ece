import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleError = ({ error }) => {
  if(success) {
    return toast.success(message, {position: toast.POSITION.BOTTOM_RIGHT,autoClose: 5000})
  }
  if(error) {
    return toast.error(message, {position: toast.POSITION.BOTTOM_RIGHT,autoClose: 5000})
  }
}

export default Toast