import React from 'react';
import moment from 'moment';
import authenticate from '../../../commons/utils/authenticate';
import { AppLayout, Col, Row, TextField, Button } from '../../../commons/uikit';
import s from './Feedback.scss';

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
      <AppLayout title={"Đóng góp ý kiến"}>
        <Row>
          <Col md={7}>
            <Row centerXs>
              <Col md={10}>
                <h3>Chúng tôi rất vui khi nhận được những ý kiến đóng góp, đánh giá, nhận xét từ các bạn.</h3>
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
                      rows: 12,
                    }}
                  />
                  <Button type="submit" className="m-r-15">Gửi</Button>
                  <Button type="button" color="light-grey" onClick={() => this.resetForm()}>Nhập lại</Button>
                </form>
              </Col>
            </Row>
          </Col>
        </Row>
      </AppLayout>
    )
  }
}

export default authenticate(Dashboard);