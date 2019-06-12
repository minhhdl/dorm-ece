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
                <h3>Ban Giám Đốc</h3>
                •	Giám đốc:{'\n'}
                ThS. Trần Tấn Phúc{'\n'}
                -	Email: ttphuc@dut.udn.vn{'\n'}
                -	Phụ trách chung, trực tiếp chỉ đạo công tác tổ chức nhân sự, tài chính, kinh doanh, hoạt động phong trào sinh viên, ..{'\n'}
                -	Chịu trách nhiệm trước Hiệu trưởng Trường Đại học Bách khoa – Đại học Đà Nẵng và các cơ quan quản lý cấp trên về mọi hoạt động của Trung tâm.{'\n'}
                -	Trực tiếp chỉ đạo các mặt hoạt động của Phòng Tài chính Kế hoạch.{'\n'}{'\n'}{'\n'}

                •	Phó Giám đốc:{'\n'}
                ThS. Hoàng Mạnh Hải{'\n'}
                -	Email: hmhai@dut.udn.vn{'\n'}
                -	Phụ trách công tác đối ngoại, bảo trì và phát triển CSVC an toàn PCCC, tin học hóa{'\n'}
                -	Trực tiếp chỉ đạo các mặt hoạt động của Phòng Hành chính.{'\n'}{'\n'}{'\n'}

                •	Trưởng Ban quản lý tòa nhà KTX{'\n'}
                Ông Lê Đức Niêm{'\n'}
                -	Email: ldniem@dut.udn.vn{'\n'}
                -	Phụ trách công tác nội chính, quản lý an ninh trật tự, vệ sinh môi trường.{'\n'}
                -	Trực tiếp chỉ đạo các mặt hoạt động của phòng An ninh, phòng Y tế.{'\n'}

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