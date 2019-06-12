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
              <Col md={9}>
                <div className={s.post}>
                  <div className={s.postTitle}>
                    Thông báo về kết quả xét duyệt phòng dịch vụ tầng 11 và 12 (Đợt 1), hợp đồng thuê chỗ ở 12 tháng, năm học 2019-2020
                  </div>
                  <div className={s.postContent}>
                    1. Kết quả xét duyệt phòng dịch vụ tầng 11 và 12, hợp đồng 12 tháng (16/8/2019 – 15/8/2020):{'\n'}
                    - Xét gia hạn đối với sinh viên cũ (đại học: từ K2015, cao học: từ K.2017), cụ thể:{'\n'}
                    o Tầng 12 (phòng máy lạnh, 4 người): điểm lưu trú từ 114 điểm trở lên.{'\n'}
                    o Tầng 11 (phòng máy lạnh, 6 người): điểm lưu trú từ 130 điểm trở lên.{'\n'}
                    - Không tiếp nhận sinh viên mới (để dành cho sinh viên năm nhất K.2019). Đối với sinh viên đăng ký phòng dịch vụ tầng 11 và 12 mà chưa được xét duyệt, có thể đăng ký phòng thường (8 người/phòng), hạn chót đăng ký: 05/6/2019.
                  </div>
                </div>
                <div className={s.post}>
                  <div className={s.postTitle}>
                    Thông báo về kết quả xét duyệt phòng dịch vụ tầng 11 và 12 (Đợt 1), hợp đồng thuê chỗ ở 12 tháng, năm học 2019-2020
                  </div>
                  <div className={s.postContent}>
                    1. Kết quả xét duyệt phòng dịch vụ tầng 11 và 12, hợp đồng 12 tháng (16/8/2019 – 15/8/2020):{'\n'}
                    - Xét gia hạn đối với sinh viên cũ (đại học: từ K2015, cao học: từ K.2017), cụ thể:{'\n'}
                    o Tầng 12 (phòng máy lạnh, 4 người): điểm lưu trú từ 114 điểm trở lên.{'\n'}
                    o Tầng 11 (phòng máy lạnh, 6 người): điểm lưu trú từ 130 điểm trở lên.{'\n'}
                    - Không tiếp nhận sinh viên mới (để dành cho sinh viên năm nhất K.2019). Đối với sinh viên đăng ký phòng dịch vụ tầng 11 và 12 mà chưa được xét duyệt, có thể đăng ký phòng thường (8 người/phòng), hạn chót đăng ký: 05/6/2019.
                  </div>
                </div>
                <div className={s.post}>
                  <div className={s.postTitle}>
                    Thông báo về kết quả xét duyệt phòng dịch vụ tầng 11 và 12 (Đợt 1), hợp đồng thuê chỗ ở 12 tháng, năm học 2019-2020
                  </div>
                  <div className={s.postContent}>
                    1. Kết quả xét duyệt phòng dịch vụ tầng 11 và 12, hợp đồng 12 tháng (16/8/2019 – 15/8/2020):{'\n'}
                    - Xét gia hạn đối với sinh viên cũ (đại học: từ K2015, cao học: từ K.2017), cụ thể:{'\n'}
                    o Tầng 12 (phòng máy lạnh, 4 người): điểm lưu trú từ 114 điểm trở lên.{'\n'}
                    o Tầng 11 (phòng máy lạnh, 6 người): điểm lưu trú từ 130 điểm trở lên.{'\n'}
                    - Không tiếp nhận sinh viên mới (để dành cho sinh viên năm nhất K.2019). Đối với sinh viên đăng ký phòng dịch vụ tầng 11 và 12 mà chưa được xét duyệt, có thể đăng ký phòng thường (8 người/phòng), hạn chót đăng ký: 05/6/2019.
                  </div>
                </div>
                <div className={s.post}>
                  <div className={s.postTitle}>
                    Thông báo về kết quả xét duyệt phòng dịch vụ tầng 11 và 12 (Đợt 1), hợp đồng thuê chỗ ở 12 tháng, năm học 2019-2020
                  </div>
                  <div className={s.postContent}>
                    1. Kết quả xét duyệt phòng dịch vụ tầng 11 và 12, hợp đồng 12 tháng (16/8/2019 – 15/8/2020):{'\n'}
                    - Xét gia hạn đối với sinh viên cũ (đại học: từ K2015, cao học: từ K.2017), cụ thể:{'\n'}
                    o Tầng 12 (phòng máy lạnh, 4 người): điểm lưu trú từ 114 điểm trở lên.{'\n'}
                    o Tầng 11 (phòng máy lạnh, 6 người): điểm lưu trú từ 130 điểm trở lên.{'\n'}
                    - Không tiếp nhận sinh viên mới (để dành cho sinh viên năm nhất K.2019). Đối với sinh viên đăng ký phòng dịch vụ tầng 11 và 12 mà chưa được xét duyệt, có thể đăng ký phòng thường (8 người/phòng), hạn chót đăng ký: 05/6/2019.
                  </div>
                </div>
                <div className={s.post}>
                  <div className={s.postTitle}>
                    Thông báo về kết quả xét duyệt phòng dịch vụ tầng 11 và 12 (Đợt 1), hợp đồng thuê chỗ ở 12 tháng, năm học 2019-2020
                  </div>
                  <div className={s.postContent}>
                    1. Kết quả xét duyệt phòng dịch vụ tầng 11 và 12, hợp đồng 12 tháng (16/8/2019 – 15/8/2020):{'\n'}
                    - Xét gia hạn đối với sinh viên cũ (đại học: từ K2015, cao học: từ K.2017), cụ thể:{'\n'}
                    o Tầng 12 (phòng máy lạnh, 4 người): điểm lưu trú từ 114 điểm trở lên.{'\n'}
                    o Tầng 11 (phòng máy lạnh, 6 người): điểm lưu trú từ 130 điểm trở lên.{'\n'}
                    - Không tiếp nhận sinh viên mới (để dành cho sinh viên năm nhất K.2019). Đối với sinh viên đăng ký phòng dịch vụ tầng 11 và 12 mà chưa được xét duyệt, có thể đăng ký phòng thường (8 người/phòng), hạn chót đăng ký: 05/6/2019.
                  </div>
                </div>
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