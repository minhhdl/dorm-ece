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
    const data = await UserServices.getDormRegistrations();
    console.log(data);
    if (data) {
      this.setState({ users: data.data });
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

  activateRegistration = async (regId) => {
    try {
      await UserServices.activateRegistration(regId);
      Swal.fire({
        title: 'Thành công!',
        text: 'Duyệt đơn đăng ký phòng thành công.',
        type: 'success',
        confirmButtonText: 'OK',
      })
      this.getUsers();
    } catch (e) {
      console.log(e)
      Swal.fire({
        title: 'Đã xảy ra lỗi!',
        text: 'Duyệt đơn đăng ký phòng không thành công. Vui lòng thử lại',
        type: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  render() {
    const { users, openDialog, selected } = this.state;
    return (
      <AppLayout
        title="Danh sách đăng ký phòng"
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
                    Phòng
                  </th>
                  <th>
                    Thời gian
                  </th>
                  <th>
                    Trạng thái
                  </th>
                  <th />
                </tr>
                {
                  users.map((dorm, key) => {
                    const {
                      _id: id, room, sem1, sem2, sem3, user, status
                    } = dorm;
                    return (
                      <tr key={id}>
                        <td>
                          {key + 1}
                        </td>
                        <td>
                          {user.fullname || '-'}
                        </td>
                        <td>
                          P.{room || '-'}
                        </td>
                        <td>
                          {sem1 && 'Kì I'} {sem2 && 'Kì II'} {sem3 && 'Kì III'}
                        </td>
                        <td>
                          {status !== 'accepted' ? 'Đang chờ duyệt' : 'Đã duyệt'}
                        </td>
                        <td className="cell-actions">
                          {/* <a href={USER_DETAIL(id)}>
                            <Button outline autoWidth className="m-r-10">
                              <i className="material-icons">
                                remove_red_eye
                              </i>
                            </Button>
                          </a> */}
                          <Button className="m-r-10" outline autoWidth onClick={() => this.handleOpenDialog(dorm)}>
                            Chi tiết
                          </Button>
                          {status !== 'accepted' && (
                            <Button className="m-r-10" outline autoWidth onClick={() => this.activateRegistration(id)}>
                              Duyệt
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
          <DialogTitle id="simple-dialog-title">Thông tin chi tiết đăng ký phòng</DialogTitle>
          {selected && (
            <Fragment>
              <DialogContent>
                <div className={s.field}>
                  <span className={s.fieldName}>Phòng</span>
                  <span>{selected.room}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Họ và tên</span>
                  <span>{selected.user.fullname || 'Sinh viên 1'}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Số điện thoại</span>
                  <span>{selected.user.phone}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Email</span>
                  <span>{selected.user.email}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Ngày sinh</span>
                  <span>{selected.user.dob || '22-02-1996'}</span>
                </div>
                
                {(() => {
                  selected.user.new_student_info = selected.user.new_student_info || {};
                  selected.user.old_student_info = selected.user.old_student_info || {};
                  return selected.user.is_new_student ? ([
                    <div className={s.field}>
                      <span className={s.fieldName}>Số báo danh</span>
                      <span>{selected.user.new_student_info.registration_number || '-'}</span>
                    </div>,
                    <div className={s.field}>
                      <span className={s.fieldName}>Mã ngành</span>
                      <span>{selected.user.new_student_info.speciality_code || '-'}</span>
                    </div>,
                    <div className={s.imageField}>
                      <span className={s.fieldName}>Giấy báo trúng tuyển</span>
                      {selected.user.new_student_info.offer_letter_image ? <img src={selected.user.new_student_info.offer_letter_image} /> : <span>-</span>}
                    </div>
                  ]) : ([
                    <div className={s.field}>
                      <span className={s.fieldName}>Mã sinh viên</span>
                      <span>{selected.user.old_student_info.student_code || '-'}</span>
                    </div>,
                    <div className={s.field}>
                      <span className={s.fieldName}>Lớp</span>
                      <span>{selected.user.old_student_info.class || '-'}</span>
                    </div>,
                    <div className={s.field}>
                      <span className={s.fieldName}>Khoa</span>
                      <span>{selected.user.old_student_info.faculty || '-'}</span>
                    </div>
                  ]);
                })()}
                <div className={s.field}>
                  <span className={s.fieldName}>Tài khoản ngân hàng</span>
                  <span>{selected.bank_account_number}</span>
                </div>
                <div className={s.field}>
                  <span className={s.fieldName}>Tên chủ thẻ</span>
                  <span>{selected.bank_account_name}</span>
                </div>
                <div className={s.imageField}>
                  <span className={s.fieldName}>Ảnh xác minh</span>
                  {selected.image ? <img src={selected.image} /> : <span>-</span>}
                </div>
              </DialogContent>
              <DialogActions>
                {!selected.status !== 'accepted' && (
                  <Button onClick={() => this.activateRegistration(selected._id)}>Duyệt đăng ký</Button>
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
