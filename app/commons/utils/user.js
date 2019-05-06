import cookies from './cookies';

export const User = {
  store: (user, access_token) => {
    cookies.set('dorm@accesstoken', access_token, { path: '/' });
    cookies.set('dorm@user', user, { path: '/' });
  },
  getCurrent: () => {
    const user = cookies.get('dorm@user');
    return user;
  },
  getToken: () => {
    const token = cookies.get('dorm@accesstoken');
    return token;
  },
  removeSession: () => {
    cookies.remove('dorm@accesstoken');
    cookies.remove('dorm@user');
  }
}