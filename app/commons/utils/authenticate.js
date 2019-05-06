import React, { Component } from 'react';
import { User } from './user';

const Authentication = (WrappedComponent) => {
  class AuthComponent extends Component {
    componentDidMount() {
      const { token } = this.props;
      const accessToken = User.getToken();
      if (!token && !accessToken) {
        global.window.location.href = '/app/login';
      }
    }

    static async getInitialProps({ req }) {
      return { token: req ? req.cookies['dorm@accesstoken'] : null };
    }

    render() {
      const { token } = this.props;
      if (!token) {
        return <div />;
      }
      return <div className="admin"><WrappedComponent {...this.props} /></div>;
    }
  }

  return AuthComponent;
};

export default Authentication;
