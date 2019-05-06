import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { AppLayout, Button, Block, Row, Col } from '../../../commons/uikit';
import { ADD_USER_URL, USER_DETAIL, EDIT_USER_URL } from '../../../constants';
import authenticate from '../../../commons/utils/authenticate';
import * as UserServices from './services';
import s from './Users.scss';

class ListUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      openDialog: false,
      selected: null,
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.comfirmDeleteUser = this.comfirmDeleteUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const data = await UserServices.getUsers();
    console.log(data);
    if (data) {
      this.setState({ users: data.users });
    }
  }

  deleteUser = async (index) => {
    const { users } = this.state;
    const user = users[index];
    const count = await UserServices.deleteUser(user._id);
    if (count) {
      users.splice(index, 1);
      this.setState({ users }, () => {
        Swal.fire(
          'Deleted!',
          'Your user has been deleted.',
          'success',
        );
      });
    }
  }

  comfirmDeleteUser = async (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.deleteUser(index);
      }
    });
  }

  handleOpenDialog(user) {
    this.setState({ selected: user, openDialog: true });
  }

  handleCloseDialog() {
    this.setState({ selected: null, openDialog: false });
  }

  activateUser = async (userId) => {
    try {
      await UserServices.activateUser(userId);
      Swal.fire({
        title: 'Thành công!',
        text: 'Duyệt tài khoản thành công.',
        type: 'success',
        confirmButtonText: 'OK',
      })
      this.getUsers();
    } catch (e) {
      Swal.fire({
        title: 'Đã xảy ra lỗi!',
        text: 'Duyệt tài khoản không thành công. Vui lòng thử lại',
        type: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  deactivateUser = async (userId) => {
    try {
      await UserServices.deactivateUser(userId);
      Swal.fire({
        title: 'Thành công!',
        text: 'Khóa tài khoản thành công.',
        type: 'success',
        confirmButtonText: 'OK',
      })
      this.getUsers();
    } catch (e) {
      Swal.fire({
        title: 'Đã xảy ra lỗi!',
        text: 'Khóa tài khoản không thành công. Vui lòng thử lại',
        type: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  render() {
    const { users, openDialog, selected } = this.state;
    return (
      <AppLayout
        title="Danh sách tài khoản"
        // topRightButton={(
        //   <a href={ADD_USER_URL}>
        //     <Button>
        //       Add new User
        //     </Button>
        //   </a>
        // )}
      >
        <Block noHeader>
          <div className="table-responsive">
            <table>
              <tbody>
                <tr>
                  <th>
                    #
                  </th>
                  <th>
                    Họ và tên
                  </th>
                  <th>
                    Email
                  </th>
                  <th>
                    Số điện thoại
                  </th>
                  <th>
                    Số CMND
                  </th>
                  <th>
                    Hộ khẩu
                  </th>
                  <th>
                    Diện ưu tiên
                  </th>
                  <th>
                    Trạng thái
                  </th>
                  <th />
                </tr>
                {
                  users.map((user, key) => {
                    const {
                      _id: id, fullname, email, phone, identity_number, address, is_verified, priorities
                    } = user;
                    const prioritiesList = priorities.map(item => {
                      switch(item.name) {
                        case 'poor-family': return 'Hộ nghèo';
                        case 'ethnic-minority': return 'Dân tộc thiểu số';
                        case 'wounded-soldiers-kid': return 'Con thương binh, liệt sỹ';
                      }
                    });
                    return (
                      <tr key={id}>
                        <td>
                          {key + 1}
                        </td>
                        <td>
                          {fullname || '-'}
                        </td>
                        <td>
                          {email || '-'}
                        </td>
                        <td>
                          {phone || '-'}
                        </td>
                        <td>
                          {identity_number || '-'}
                        </td>
                        <td>
                          {address || '-' }
                        </td>
                        <td>
                          {prioritiesList.join(', ') || '-' }
                        </td>
                        <td>
                          {!is_verified ? 'Đang chờ duyệt' : 'Đã duyệt'}
                        </td>
                        <td className="cell-actions">
                          {/* <a href={USER_DETAIL(id)}>
                            <Button outline autoWidth className="m-r-10">
                              <i className="material-icons">
                                remove_red_eye
                              </i>
                            </Button>
                          </a> */}
                          <Button className="m-r-10" outline autoWidth onClick={() => this.handleOpenDialog(user)}>
                            Chi tiết
                          </Button>
                          {!is_verified ? (
                            <Button className="m-r-10" outline autoWidth onClick={() => this.activateUser(id)}>
                              Duyệt
                            </Button>
                          ) : (
                            <Button className="m-r-10" color="danger" outline autoWidth onClick={() => this.deactivateUser(id)}>
                              Khóa tài khoản
                            </Button>
                          )}
                          {/* <a href={EDIT_USER_URL(id)}>
                            <Button outline autoWidth className="m-r-10">
                              <i className="material-icons">
                                edit
                              </i>
                            </Button>
                          </a>
                          <Button outline autoWidth color="danger" onClick={() => this.comfirmDeleteUser(key)}>
                            <i className="material-icons">
                              delete
                            </i>
                          </Button> */}
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </Block>

        <Dialog scroll="body" maxWidth="md" open={openDialog} onClose={() => this.handleCloseDialog()} aria-labelledby="simple-dialog-title">
          <DialogTitle id="simple-dialog-title">Thông tin chi tiết tài khoản</DialogTitle>
          {selected && (
            <Fragment>
              <DialogContent>
                <div className={s.field}>
                  <span className={s.fieldName}>Họ và tên</span>
                  <span>{selected.fullname || 'Sinh viên 1'}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Số điện thoại</span>
                  <span>{selected.phone}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Email</span>
                  <span>{selected.email}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Ngày sinh</span>
                  <span>{selected.dob || '22-02-1996'}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Giới tính</span>
                  <span>{selected.gender || 'Name'}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Hộ khẩu</span>
                  <span>{selected.address || 'Đà Nẵng, Việt Nam'}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>CMND</span>
                  <span>{selected.identity_number}</span>
                </div>
                <Row>
                  <Col md={6}>
                    <div className={s.imageField}>
                      <span className={s.fieldName}>CMND mặt trước</span>
                      {selected.identity_card_front ? <img src={selected.identity_card_front} /> : <span>-</span>}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className={s.imageField}>
                      <span className={s.fieldName}>CMND mặt sau</span>
                      {selected.identity_card_back ? <img src={selected.identity_card_back} /> : <span>-</span>}
                    </div>
                  </Col>
                </Row>
                {(() => {
                  selected.new_student_info = selected.new_student_info || {};
                  selected.old_student_info = selected.old_student_info || {};
                  return selected.is_new_student ? ([
                    <div className={s.field}>
                      <span className={s.fieldName}>Số báo danh</span>
                      <span>{selected.new_student_info.registration_number || '-'}</span>
                    </div>,
                    <div className={s.field}>
                      <span className={s.fieldName}>Mã ngành</span>
                      <span>{selected.new_student_info.speciality_code || '-'}</span>
                    </div>,
                    <div className={s.imageField}>
                      <span className={s.fieldName}>Giấy báo trúng tuyển</span>
                      {selected.new_student_info.offer_letter_image ? <img src={selected.new_student_info.offer_letter_image} /> : <span>-</span>}
                    </div>
                  ]) : ([
                    <div className={s.field}>
                      <span className={s.fieldName}>Mã sinh viên</span>
                      <span>{selected.old_student_info.student_code || '-'}</span>
                    </div>,
                    <div className={s.field}>
                      <span className={s.fieldName}>Lớp</span>
                      <span>{selected.old_student_info.class || '-'}</span>
                    </div>,
                    <div className={s.field}>
                      <span className={s.fieldName}>Khoa</span>
                      <span>{selected.old_student_info.faculty || '-'}</span>
                    </div>
                  ]);
                })()}
                <div className={s.field}>
                  <span className={s.fieldName}>Giấy tờ đính kèm</span>
                  <span>-</span>
                </div>
              </DialogContent>
              <DialogActions>
                {!selected.is_verified ? (
                  <Button onClick={() => this.activateUser(selected._id)}>Duyệt tài khoản</Button>
                ) : (
                  <Button color="danger" onClick={() => this.deactivateUser(selected._id)}>Khóa tài khoản</Button>
                )}
                <Button onClick={() => this.handleCloseDialog()} color="light-grey">Đóng</Button>
              </DialogActions>
            </Fragment>
          )}
        </Dialog>
      </AppLayout>
    );
  }
}

export default authenticate(ListUsers);
