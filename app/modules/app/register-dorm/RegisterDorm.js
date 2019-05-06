import React from 'react';
import Head from 'next/head';
import Swal from 'sweetalert2';
import authenticate from '../../../commons/utils/authenticate';
import { AppLayout, Row, Col, Checkbox, TextField, Container,  PhotoUploader, Button } from '../../../commons/uikit';
import { registerDorm } from './services';
import s from './RegisterDorm.scss';

class RegisterDorm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sem1: false,
      sem2: false,
      sem3: false,
      image: '',
      room: '101',
      bankAccountName: '',
      bankAccountNumber: '',
    };

    this.startUpload = this.startUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.uploadWidget = window.cloudinary.createUploadWidget({
      cloudName: 'izzilab', 
      uploadPreset: 'downyshoes',
      multiple: false,
    });
  }

  startUpload = async (field) => {
    cloudinary.openUploadWidget({
      cloudName: 'izzilab', 
      uploadPreset: 'downyshoes',
    }, (error, result) => {
      if (result && result.event === "success") {
        this.setState({ image: result.info.url });
      }
    });
  }

  handleChange(field, value) {
    let state = this.state;
    state[field] = value;
    this.setState(Object.assign({}, state));
  }

  async handleSubmit() {
    try {
      const { image, sem1, sem2, sem3, room, bankAccountName, bankAccountNumber } = this.state;

      const reg = await registerDorm({
        image, sem1, sem2, sem3, room,
        bank_account_name: bankAccountName,
        bank_account_number: bankAccountNumber,
      });

      Swal.fire({
        title: 'Thành công!',
        text: 'Đăng ký phòng thành công.',
        type: 'success',
        confirmButtonText: 'OK'
      })
      this.resetForm();
    } catch (e) {
      console.log(e)
      Swal.fire({
        title: 'Đã xảy ra lỗi!',
        text: 'Đăng ký phòng không thành công. Vui lòng kiểm tra thông tin và thử lại',
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
      sem1: false,
      sem2: false,
      sem3: false,
      image: '',
      room: '101',
      bankAccountName: '',
      bankAccountNumber: '',
    });
  }

  render() {
    const { image, sem1, sem2, sem3, room, bankAccountName, bankAccountNumber } = this.state;
    return (
      <AppLayout title={"Đăng ký phòng"}>
        <Head>
          <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
        </Head>
        <Container>
          <Row>
            <Col md={10}>
              <span style={{ marginBottom: 10, display: 'inline-block' }}>Loại phòng đăng ký</span>
              <Row className="m-b-20">
                <Col md={3}>
                  <button
                    className={`${s.dormItem} ${room === '101' ? s.active : ''}`}
                    onClick={() => this.chooseRoom('101')}
                  >
                    P. 101
                  </button>
                </Col>
                <Col md={3}>
                  <button
                    className={`${s.dormItem} ${room === '102' ? s.active : ''}`}
                    onClick={() => this.chooseRoom('102')}
                  >
                    P. 102
                  </button>
                </Col>
                <Col md={3}>
                  <button
                    className={`${s.dormItem} ${room === '103' ? s.active : ''}`}
                    onClick={() => this.chooseRoom('103')}
                  >
                    P. 103
                  </button>
                </Col>
              </Row>
              <span style={{ marginBottom: 10, display: 'inline-block' }}>Thời gian đăng ký</span>
              <Row className="m-b-20">
                <Col md={3}>
                  <Checkbox
                    label="Kì I"
                    id="is-poor-family"
                    onChange={e => this.handleChange('sem1', e.target.checked)}
                    checked={sem1}
                  />
                </Col>
                <Col md={3}>
                  <Checkbox
                    label="Kì II"
                    id="is-wounded-soldiers-kid"
                    onChange={e => this.handleChange('sem2', e.target.checked)}
                    checked={sem2}
                  />
                </Col>
                <Col md={3}>
                  <Checkbox
                    label="Kì III"
                    id="is-ethnic-minority"
                    onChange={e => this.handleChange('sem3', e.target.checked)}
                    checked={sem3}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <TextField 
                    label={"Tài khoản ngân hàng"}
                    onChange={(e) => this.handleChange("bankAccountName", e.target.value)}
                    value={bankAccountName}
                  />
                </Col>
                <Col md={6}>
                  <TextField 
                    label={"Tên chủ thẻ"}
                    onChange={(e) => this.handleChange("bankAccountNumber", e.target.value)}
                    value={bankAccountNumber}
                  />
                </Col>
              </Row>
              <PhotoUploader
                label="Ảnh xác minh"
                handleUpload={() => {}}
                onClick={() => this.startUpload('idCardFront')}
                preview={image}
              />
              <div className="flex-row-right">
                <Button onClick={() => this.handleSubmit()}>Xác nhận</Button>
                <Button className="m-l-20" color="white" onClick={() => this.resetForm()}>Nhập lại</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </AppLayout>
    )
  }
}

export default authenticate(RegisterDorm);