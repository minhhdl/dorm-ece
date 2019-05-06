export const API_URL = process.env.NODE_ENV === 'production' ? 'https://dorm-ece.herokuapp.com/api' : 'http://localhost:5000/api';
export const S3_BUCKET = 'pmh-souvenir';
export const S3_URL = 'https://pmh-souvenir.s3.ap-southeast-1.amazonaws.com/';
export const TOKEN_INVALID_CODE = 'INVALID_TOKEN';
export const AUTHORIZATION_REQUIRED_CODE = 'AUTHORIZATION_REQUIRED';

//APP URLS
export const USERS_URL = '/app/users';
export const USER_DETAIL = id => `/app/users/detail?id=${id}`;
export const ADD_USER_URL = '/app/users/add';
export const EDIT_USER_URL = id => `/app/users/edit?id=${id}`;

//API ENDPOINTS
export const ENDPOINT_USER_LOGIN = `/auth/login`;
export const ENDPOINT_PRODUCTS = '/users';
export const ENDPOINT_GET_PRODUCT_BY_ID = id => `/users/detail/${id}`;

export const ENDPOINT_USERS = '/users';
export const ENDPOINT_ACTIVATE_USER = userId => `/users/${userId}/activate`;
export const ENDPOINT_DEACTIVATE_USER = userId => `/users/${userId}/deactivate`;
export const ENDPOINT_REGISTER_DORM = '/users/dorm';

export const ENDPOINT_DORM_REGISTRATIONS = '/dorm-registrations';
export const ENDPOINT_ACTIVATE_DORM_REGISTRATIONS = regId => `/dorm-registrations/${regId}/activate`;