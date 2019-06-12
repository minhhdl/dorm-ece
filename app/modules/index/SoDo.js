import React from 'react';
import { Container, Row, Col, Block, Button } from '../../commons/uikit';
import s from './Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <header>
          <img src="/img/index-banner.jpg" width="100%" />
        </header>
        <Row className="p-b-40">
          <Col md={3}>
          <ul className={s.sideMenu}>
              <li className={s.menuDivider}>
                <a href="/">
                  Trang chủ
                </a>
              </li>
              <li className={s.menuDivider}>
                <a href="#">
                  Tổng quan
                </a>
              </li>
              <li className={s.menuItem}>
                <a href="/gioi-thieu">Giới thiệu KTX</a>
              </li>
              <li className={s.menuItem}>
                <a href="/so-do-to-chuc">Sơ đồ tổ chức</a>
              </li>
              <li className={s.menuItem}>
                <a href="/ban-giam-doc">Ban giám đốc</a>
              </li>
              <li className={s.menuDivider}>
                <a href="/quy-che">
                  Quy chế - Quy định
                </a>
              </li>
              <li className={s.menuDivider}>
                <a href="#">
                  Bảng giá
                </a>
              </li>
              <li className={s.menuItem}>
                <a href="/bang-gia-phong">Bảng giá phòng ở</a>
              </li>
              <li className={s.menuItem}>
                <a href="/bang-gia-dich-vu">Bảng giá dịch vụ</a>
              </li>
              <li className={s.menuDivider}>
                <a href="/gop-y">Góp ý</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} className={s.showXs}>
            <Block noHeader className="m-t-20 p-10" style={{ width: '100%' }}>
              <div className="flex-column-center">
              <Button onClick={() => window.location.href = '/app/login'} className="m-b-10">Đăng nhập</Button>
              <span>hoặc</span>
              <Button onClick={() => window.location.href = '/app/register'} className="m-t-10" outline>Đăng Ký</Button>
              </div>
            </Block>
          </Col>
          <Col md={9}>
            <Row>
              <Col md={9} className={s.contentPage}>
                <h3>Sơ Đồ Tổ Chức</h3>
                -	Giám đốc: Chịu trách nhiệm toàn diện về hoạt động của TTQLKTX trước lãnh đạo ĐHBK-ĐHĐN. Hỗ trợ cho Giám đốc là các Phó Giám đốc chịu trách nhiệm các mảng công tác chuyên môn.{'\n'}{'\n'}
                -	Văn phòng Ký túc xá: Hỗ trợ Ban Giám đốc về công tác tổ chức cán bộ, hành chính tổng hợp. Là đầu mối liên hệ công việc với các phòng ban ĐHBK-ĐHĐN.{'\n'}{'\n'}
                -	Phòng quản lý thông tin Sinh viên: Tham mưu cho Ban Giám đốc về công tác tiếp nhận, bố trí và sắp xếp sinh viên vào ở Ký túc xá; chăm lo đời sống vật chất, văn hóa tinh thần cho sinh viên.{'\n'}{'\n'}
                -	Phòng An ninh Sinh viên: Đảm bảo công tác an ninh trật tự, an ninh chính trị, an toàn con người, tài sản trong phạm vi Ký túc xá. Phối hợp với các chính quyền các địa phương, khu vực trong việc tuần tra, phòng chống tội phạm, tệ nạn xã hội tại Khu vực Liên Chiểu, Đà Nẵng.{'\n'}{'\n'}
                -	Phòng Kế hoạch - Tài chính: Tham mưu cho Ban Giám đốc về công tác kế hoạch tài chính, chế độ kế toán và quản lý sử dụng hiệu quả các nguồn tài chính, chịu trách nhiệm thu, chi trả các khoản lệ phí của sinh viên.{'\n'}{'\n'}
                -	Phòng Y tế: Chăm sóc sức khoẻ, khám và chữa bệnh cho sinh viên. Thực hiện công tác phòng chống dịch bệnh, kiểm tra, giám sát vệ sinh an toàn thực phẩm, vệ sinh môi trường trong Ký túc xá.{'\n'}{'\n'}
              </Col>
              <Col md={3} className={s.hideXs}>
                <Block noHeader className="m-t-20 p-10">
                  <div className="flex-column-center">
                    <Button onClick={() => window.location.href = '/app/login'} className="m-b-10">Đăng nhập</Button>
                    <span>hoặc</span>
                    <Button onClick={() => window.location.href = '/app/register'} className="m-t-10" outline>Đăng Ký</Button>
                  </div>
                </Block>
              </Col>
            </Row>
          </Col>
        </Row>
        <footer className={s.footer}>
          Copyright © 2019
        </footer>
      </Container>
    );
  }
}

export default Home;