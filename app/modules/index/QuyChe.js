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
                <h3>Quy Chế - Quy Định</h3>
                <b>Điều 1.  Quy định chung</b>{'\n'}
                {`1.   Tất cả sinh viên khi ra vào Ký túc xá phải mang theo thẻ nội trú, khách đến liên hệ công tác, thân nhân, bạn bè của sinh viên đến thăm phải theo sự hướng dẫn của bảo vệ;
                2.   Chấp hành nghiêm túc sự quản lý, điều động, sắp xếp chỗ ở của Tổ KTX.
                `}{'\n'}
                <b>Điều 2. Quy định về sinh hoạt</b>{'\n'}
                {`1. Giờ đóng, mở cổng khu KTX sinh viên:
                -   Giờ mở cửa: 5h00;
                -   Giờ đóng cửa: 23h00;
                -   Giờ nghỉ trưa: 12h00 –13h00;
                -   Giờ tự học: Sáng từ 7h30 – 11h; Chiều từ 14h – 16h30; Tối 19h – 22h.
                2. Không tổ chức hoặc tham gia uống rượu, bia, đánh bài và các hình thức cờ bạc khác. Không hút thuốc trong khuôn viên KTX;
                3. Không xả rác, viết, vẽ dán giấy, treo các vật dụng lên tường, không treo rèm, mắc võng trong phòng ở, nhà ở và các khu vực công cộng. Quần áo, sách vở, đồ dùng cá nhân phải sắp xếp gọn gàng và để đúng nơi quy định;
                4. Chỉ được chơi thể thao ở những nơi quy định. Không chơi thể thao trong phòng ở, hành lang, ban công; các phòng sinh hoạt công cộng và trên đường đi;
                5. Không có hành vi, tác phong, ăn mặc thiếu văn hóa gây ảnh hưởng đến môi trường sống. Không tiếp khách trong phòng ở;
                6. Chỉ tắm, giặt đúng nơi quy định. Nghiêm cấm tắm ở các nơi nguy hiểm (các ao, hồ, bể chứa nước  xung quanh KTX);
                7. Chỉ sử dụng máy vi tính vào mục đích học tập và giải trí lành mạnh.
                `}{'\n'}
                <b>Điều 3. Quy định về an ninh, trật tự</b>{'\n'}
                {`1.   Không chứa chấp người lạ trong phòng ở. Khi có thân nhân đến thăm, sinh viên phải báo cho trưởng nhà hoặc bảo vệ để sắp xếp lưu trú tại phòng khách KTX;
                2.   Không tạo ra, tàng trữ hoặc sử dụng hung khí, các chất dễ cháy nổ, các chất kích thích, gây nghiện, tài liệu và văn hoá phẩm có nội dung không lành mạnh;
                3.   Không gây gổ, kích động đánh nhau hoặc tham gia đánh nhau gây mất an ninh trật tự;
                4.   Không chứa chấp, che giấu tội phạm, hàng quốc cấm;
                5.   Không được dán áp phích, băng rôn, biểu ngữ, quảng cáo hoặc vẽ, viết, xóa, sửa nội dung tại các bảng tin khi chưa được phép;
                6.   Không leo, trèo hàng rào vào khuôn viên KTX, không leo, trèo lên ban công, bông gió vào phòng ở sinh viên.
                7.   Gửi xe ở những nơi quy định; không để xe trong phòng ở, trên hành lang, chân cầu thang hoặc trước các dãy nhà, trên đường đi. Không được có hành động gây cản trở giao thông hoặc hoặc gây mất an ninh trật tự ở những nơi công cộng;
                8.   Không chở quá số người quy định, không phóng nhanh vượt ẩu, lạng lách, đánh võng. Nghiêm chỉnh chấp hành luật giao thông đường bộ khi lưu thông trong khuôn viên KTX.
                `}{'\n'}
                <b>Điều 4. Quy định về giữ gìn tài sản</b>{'\n'}
                {`1.   Không di chuyển tài sản, trang thiết bị khỏi vị trí đã được bố trí. Không được tự ý sửa chữa, cải tạo phòng ở hay làm thay đổi kết cấu ban đầu hoặc tự ý gắn thêm các trang thiết bị khác mà KTX đã trang bị;
                2.   Tiết kiệm điện, nước, tự bảo quản tài sản cá nhân; chịu trách nhiệm đền bù về những hư hỏng, mất mát do mình gây ra đối với trang thiết bị của KTX. Nghiêm cấm các hành vi phá hoại, ăn cắp của công, tài sản công dân;
                3.   Sinh viên có trách nhiệm bàn giao phòng ở cho KTX trước khi về nghỉ tết, nghỉ hè, và kết thúc thời gian nội trú tại KTX.
                `}{'\n'}
                <b>Điều 5. Quy định về vệ sinh môi trường</b>{'\n'}
                {`1.   Thường xuyên giữ gìn phòng ở, hành lang, ban công, sạch sẽ gọn gàng;tham gia đầy đủ kế hoạch làm vệ sinh môi trường khi được phân công;
                2.   Đổ rác từ 18 giờ đến 6 giờ sáng hôm sau và đúng nơi quy định.`}

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