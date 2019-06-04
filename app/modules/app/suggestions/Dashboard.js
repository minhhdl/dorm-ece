import React from 'react';
import authenticate from '../../../commons/utils/authenticate';
import { AppLayout, Col, Row, TextField, Button } from '../../../commons/uikit';
import s from './Suggestions.scss';

class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      systemNotifications: [],
      title: '',
      content: '',
    };
  }

  componentDidMount() {
  }

  onChange(field, value) {
    this.setState({ [field]: value });
  }

  async onSubmit(e) {
    e.preventDefault();
  }

  resetForm() {
    this.setState({ title: '', content: '' });
  }

  render() {
    const { notifications, systemNotifications, title, content } = this.state;
    const { user = {} } = this.props;
    const { role } = user;
    return (
      <AppLayout title={"Gợi ý khu trọ"}>
        <Row>
          <Col md={4}>
            <div className={s.item}>
              <div className={s.itemImage}>
                <img src="/img/room1.png" />
              </div>
              <div className={s.itemInfo}>
                <span className={s.itemName}>Phòng trọ Ngọc Hải</span>
                <span className={s.itemDesc}>Là khu vực tập trung đông sinh viên các trường đại học, có an ninh tốt</span>
                <span className={s.itemLocation}>
                  <i className="material-icons">room</i>
                  21/14 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng
                </span>
                <span className={s.itemPhone}>
                  <i className="material-icons">phone</i>
                  0905.224.536
                </span>
                <span className={s.itemPrice}>
                  <i className="material-icons">local_atm</i>
                  700.000 - 1.200.000
                </span>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={s.item}>
              <div className={s.itemImage}>
                <img src="/img/room2.jpeg" />
              </div>
              <div className={s.itemInfo}>
                <span className={s.itemName}>Phòng trọ Khali House</span>
                <span className={s.itemDesc}>Là khu vực tập trung đông sinh viên các trường đại học, có an ninh tốt</span>
                <span className={s.itemLocation}>
                  <i className="material-icons">room</i>
                  225/21 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng
                </span>
                <span className={s.itemPhone}>
                  <i className="material-icons">phone</i>
                  0905.344.543
                </span>
                <span className={s.itemPrice}>
                  <i className="material-icons">local_atm</i>
                  1.200.000 - 1.700.000
                </span>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={s.item}>
              <div className={s.itemImage}>
                <img src="/img/room3.jpg" />
              </div>
              <div className={s.itemInfo}>
                <span className={s.itemName}>Phòng trọ Vista</span>
                <span className={s.itemDesc}>Là khu vực tập trung đông sinh viên các trường đại học, có an ninh tốt</span>
                <span className={s.itemLocation}>
                  <i className="material-icons">room</i>
                  243/12 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng
                </span>
                <span className={s.itemPhone}>
                  <i className="material-icons">phone</i>
                  0989.653.233
                </span>
                <span className={s.itemPrice}>
                  <i className="material-icons">local_atm</i>
                  1.700.000 - 2.200.000
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </AppLayout>
    )
  }
}

export default authenticate(Suggestions);