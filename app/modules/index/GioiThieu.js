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
                <h3>Giới Thiệu KTX</h3>
                {`Địa chỉ: 60 Ngô Sĩ Liên, Liên Chiểu, Đà Nẵng
                Diện tích: 12.357m2
                Gồm 06 tòa nhà, có sức chứa gần 2.500 sinh viên.
                06 tòa nhà 5 tầng gồm các khu: A, B, C, D, E, F
                Khu vực dịch vụ & văn phòng Ký túc xá nằm tại khu điều hành Trung tâm`}
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