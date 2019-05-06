import axios from 'axios';
import Router from 'next/router';
import { API_URL, TOKEN_INVALID_CODE, S3_BUCKET } from '../../constants';
import Toastr from 'toastr';
import { User } from './user';
import 'toastr/build/toastr.css';

Toastr.options.progressBar = true;
Toastr.options.positionClass = 'toast-bottom-right';

const request = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  responseType: 'json',
});

const fileEndpoint = `/files/${S3_BUCKET}/upload`;


function handleRes(response) {
  if (response.data.status === 401) {
    Toastr.error(response.data.message, 'Please try login again!');
    window.location.href = '/app/login';
    return { error: response.data.message };
  }
  return response.data;
}

function handleError(error) {
  Toastr.error('Something went wrong.', 'An Error Occurred!');
  console.log(error.response)
  if(error.response && error.response.status === 401 && error.response.data.message === 'Invalid auth token provided.') {
    window.location.href = '/app/login';
  }
  throw error;
}

function initHeader(noAuth, isFormData) {
  const headers = Object.assign(
    {},
    {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    },
    !noAuth && { Authorization: `${User.getToken()}` },
);

  return headers;
}

export default class Request {
  static request = request

  static async post(endpoint, data, noAuth = false) {
    const headers = initHeader(noAuth);
    try {
      const response = await request.post(endpoint, data, { headers });
      return handleRes(response);
    } catch (e) {
      return handleError(e);
    }
  }

  static async put(endpoint, data, noAuth = false) {
    const headers = initHeader(noAuth);
    try {
      const response = await request.put(endpoint, data, { headers });
      return handleRes(response);
    } catch (e) {
      return handleError(e);
    }
  }

  static async delete(endpoint, noAuth = false) {
    const headers = initHeader(noAuth);
    try {
      const response = await request.delete(endpoint, { headers });
      return handleRes(response);
    } catch (e) {
      return handleError(e);
    }
  }

  static async patch(endpoint, data, noAuth = false) {
    const headers = initHeader(noAuth);
    try {
      const response = await request.patch(endpoint, data, { headers });
      return handleRes(response);
    } catch (e) {
      return handleError(e);
    }
  }

  static async get(endpoint, params, noAuth = false) {
    const headers = initHeader(noAuth);
    try {
      const response = await request.get(endpoint, { params, headers });
      return handleRes(response);
    } catch (e) {
      return handleError(e);
    }
  }

  static async upload(data, onUploadProgress, noAuth = false) {
    const headers = initHeader(noAuth, true);
    try {
      const response = await request.post(fileEndpoint, data, { headers, onUploadProgress });
      const { result } = response.data;
      return result;
    } catch (e) {
      return handleError(e);
    }
  }
}
