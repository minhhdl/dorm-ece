import React from 'react';
import authenticate from '../../../commons/utils/authenticate';
import { AppLayout } from '../../../commons/uikit';

class Dashboard extends React.Component {
  render() {
    return (
      <AppLayout title={"Dashboard"}>
      </AppLayout>
    )
  }
}

export default authenticate(Dashboard);