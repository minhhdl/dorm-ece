import React from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';
import authenticate from '../../../commons/utils/authenticate';
import { AppLayout, Col, Row, TextField, Button } from '../../../commons/uikit';
import * as NotificationService from './services';
import s from './Notifications.scss';

moment.locale('vi')

const getMessageFromCode = (code) => {
  let message = '';
  switch (code) {
    case 'service-registration-accepted': message = '<a>Đăng ký dịch vụ</a> của bạn đã được duyệt.'; break;
    case 'service-registration-reject': message = '<a>Đăng ký dịch vụ</a> của bạn đã bị từ chối.'; break;
    case 'dorm-registration-accepted': message = '<a>Đăng ký phòng</a> của bạn đã được duyệt.'; break;
    case 'dorm-registration-rejected': message = '<a>Đăng ký phòng</a> của bạn đã bị từ chối.'; break;
  }

  return message;
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      systemNotifications: [],
      title: '',
      content: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.comfirmDeleteRegistration = this.comfirmDeleteRegistration.bind(this);
    this.deleteRegistration = this.deleteRegistration.bind(this);
  }

  componentDidMount() {
    this.getNotifications();
    this.getSystemNotifications();
  }

  getNotifications = async () => {
    const { user } = this.props;
    if(user.role === 'admin') return null;
    const data = await NotificationService.getNotifications({ receiver: user._id, type: 'normal' });
    if (data) {
      this.setState({ notifications: data.notifications });
    }
  }

  getSystemNotifications = async () => {
    const data = await NotificationService.getNotifications({ type: 'system' });
    if (data) {
      this.setState({ systemNotifications: data.notifications });
    }
  }

  onChange(field, value) {
    this.setState({ [field]: value });
  }

  async onSubmit(e) {
    e.preventDefault();
    try {
      const { title, content } = this.state;
      if(!title || !content) return null;

      const noti = {
        title,
        content,
        type: 'system',
      };

      await NotificationService.addNotication(noti);
      this.getSystemNotifications();
      this.resetForm();
    } catch (e) {
      console.log(e);
    }
  }

  resetForm() {
    this.setState({ title: '', content: '' });
  }

  deleteRegistration = async (index) => {
    const { systemNotifications } = this.state;
    const notification = systemNotifications[index];
    const count = await NotificationService.deleteNotication(notification._id);
    if (count) {
      systemNotifications.splice(index, 1);
      this.setState({ systemNotifications }, () => {
        Swal.fire(
          'Đã xóa!',
          'Xóa thông báo thành công.',
          'success',
        );
      });
    }
  }

  comfirmDeleteRegistration = async (index) => {
    Swal.fire({
      title: 'Bạn có chắc?',
      text: 'Thông báo sẽ không thể khôi phục sau khi xóa.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Tiếp tục',
      cancelButtonText: 'Đóng',
    }).then((result) => {
      if (result.value) {
        this.deleteRegistration(index);
      }
    });
  }

  render() {
    const { notifications, systemNotifications, title, content } = this.state;
    const { user = {} } = this.props;
    const { role } = user;
    return (
      <AppLayout title={"Thông báo"}>
        <Row>
          {role === 'admin' ? (
            <Col md={7}>
              <Row centerXs>
                <Col md={10}>
                  <h3>Đăng thông báo mới</h3>
                  <form onSubmit={this.onSubmit}>
                    <TextField
                      label="Tiêu đề"
                      onChange={e => this.onChange('title', e.target.value)}
                      value={title}
                    />
                    <TextField
                      label="Nội dung"
                      onChange={e => this.onChange('content', e.target.value)}
                      value={content}
                      multiline
                      inputProps={{
                        rows: 2,
                      }}
                    />
                    <Button type="submit" className="m-r-15">Đăng</Button>
                    <Button type="button" color="light-grey" onClick={() => this.resetForm()}>Nhập lại</Button>
                  </form>
                </Col>
              </Row>
            </Col>
          ) : (
            <Col md={7}>
              <h3>Thông báo của bạn</h3>
              {notifications.map(item => item.created_at && (
                <div className={`${s.notification} ${item.seen ? '' : s.notificationNew}`}>
                  <div className={s.notificationContent} dangerouslySetInnerHTML={{ __html: getMessageFromCode(item.code) }} />
                  <div className={s.notificationTime}>
                    {moment(item.created_at).fromNow()}
                  </div>
                </div>
              ))}
            </Col>
          )}
          <Col md={5}>
            <h3>Thông báo hệ thống</h3>
            {systemNotifications.map((item, key) => (
              <div className={`${s.notification} ${item.seen ? '' : s.notificationNew}`}>
                {role === 'admin' && (
                  <Button
                    color="danger"
                    autoWidth
                    className={s.deleteNoti}
                    onClick={() => this.comfirmDeleteRegistration(key)}
                  >
                    <i className="material-icons">close</i>
                  </Button>
                )}
                <div className={s.notificationTitle}>
                  {item.title}
                </div>
                <div className={s.notificationContent}>
                  {item.content}
                </div>
                <div className={s.notificationTime}>
                  {moment(item.created_at).fromNow()}
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </AppLayout>
    )
  }
}

export default authenticate(Dashboard);