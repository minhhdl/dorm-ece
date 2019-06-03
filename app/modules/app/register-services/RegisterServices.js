import React from 'react';
import Head from 'next/head';
import Swal from 'sweetalert2';
import authenticate from '../../../commons/utils/authenticate';
import { AppLayout, Row, Col, Checkbox, TextField, Container,  PhotoUploader, Button } from '../../../commons/uikit';
import { registerServices } from './services';
import s from './RegisterServices.scss';

class RegisterServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parking: false,
      laundry: false,
      internet: false,
      room: '101',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleChange(field, value) {
    let state = this.state;
    state[field] = value;
    this.setState(Object.assign({}, state));
  }

  async handleSubmit() {
    try {
      const { parking, laundry, internet } = this.state;
      const { user = {} } = this.props;
      const { currentRoom = {} } = user;

      const reg = await registerServices({
        parking, laundry, internet,
        user: user._id, room: currentRoom._id,
      });

      Swal.fire({
        title: 'Thành công!',
        text: 'Đăng ký dịch vụ thành công.',
        type: 'success',
        confirmButtonText: 'OK'
      })
      this.resetForm();
    } catch (e) {
      console.log(e)
      Swal.fire({
        title: 'Đã xảy ra lỗi!',
        text: 'Đăng ký dịch vụ không thành công. Vui lòng kiểm tra thông tin và thử lại',
        type: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  chooseRoom(room) {
    this.setState({ room });
  }

  resetForm() {
    this.setState({
      parking: false,
      laundry: false,
      internet: false,
    });
  }

  render() {
    const { parking, laundry, internet } = this.state;
    const { user = {} } = this.props;
    const { currentRoom = {} } = user;
    return (
      <AppLayout title={`Đăng ký dịch vụ${currentRoom.name ? ` - P. ${currentRoom.name}` : ''}`}>
        <Container>
          <Row>
            <Col md={10}>
              <span style={{ marginBottom: 10, display: 'inline-block' }}>Dịch vụ cần đăng ký</span>
              <Row className="m-b-20">
                <Col md={3}>
                  <Checkbox
                    label="Giữ xe"
                    id="is-poor-family"
                    onChange={e => this.handleChange('parking', e.target.checked)}
                    checked={parking}
                  />
                </Col>
                <Col md={3}>
                  <Checkbox
                    label="Giặt ủi"
                    id="is-wounded-soldiers-kid"
                    onChange={e => this.handleChange('laundry', e.target.checked)}
                    checked={laundry}
                  />
                </Col>
                <Col md={3}>
                  <Checkbox
                    label="Internet"
                    id="is-ethnic-minority"
                    onChange={e => this.handleChange('internet', e.target.checked)}
                    checked={internet}
                  />
                </Col>
              </Row>
              <div className="flex-row-right">
                <Button onClick={() => this.handleSubmit()}>Xác nhận</Button>
                <Button className="m-l-20" color="light-grey" onClick={() => this.resetForm()}>Nhập lại</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </AppLayout>
    )
  }
}

export default authenticate(RegisterServices);