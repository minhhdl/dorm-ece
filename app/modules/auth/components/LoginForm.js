import React from 'react';
import Link from 'next/link';
import { TextField, Button } from '../../../commons/uikit';

const LoginForm = ({ handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label={"Email"}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <TextField
        label={"Mật khẩu"}
        type="password"
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <div className="flex-column-center m-t-40">
        <Button type="submit" onClick={handleSubmit}>Đăng nhập</Button>
        <a href="/app/register" className="m-t-30">Chưa có tài khoản? Đăng ký ngay.</a>
      </div>
    </form>
  )
}

export default LoginForm;