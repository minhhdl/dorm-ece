import React from 'react';
import cn from 'classnames';
import Swal from 'sweetalert2';
import { login } from './services/AuthServices';
import LoginForm from './components/LoginForm';
import { User } from '../../commons/utils/user';

import s from './Auth.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }
  handleChange(field, value) {
    let state = this.state;
    state[field] = value;
    this.setState(Object.assign({}, state));
  }
  async handleSubmit(e) {
    try {
      e.preventDefault();
      const data = await login(this.state);

      if (!data.user.is_verified && data.user.role !== 'admin') {
        return Swal.fire({
          title: 'Đã xảy ra lỗi!',
          text: 'Tài khoản của bạn chưa được duyệt bởi Quản trị viên. Vui lòng đăng nhập lại sau khi được xét duyệt',
          type: 'error',
          confirmButtonText: 'OK'
        })
      }

      if(data.access_token) {
        User.store(data.user, data.access_token);
        window.location.href = '/app';
      }
    } catch (e) {
      Swal.fire({
        title: 'Đã xảy ra lỗi!',
        text: 'Đăng nhập không thành công. Vui lòng kiểm tra thông tin và thử lại',
        type: 'error',
        confirmButtonText: 'OK'
      })
    }
  }
  render() {
    return (
      <div className={cn("flex-center", s["auth-page"], "admin")}>
        <div className={s["auth-block"]}>
          <h1 className={s["auth-block-title"]}>Đăng nhập vào KTX</h1>
          <LoginForm handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} />
        </div>
      </div>
    )
  }
}

export default Login;