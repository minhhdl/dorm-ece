import React, { Fragment } from 'react';
import Head from 'next/head';
import Swal from 'sweetalert2';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { AppLayout, Button, Block, Row, Col, Dropdown, MenuList, MenuItem } from '../../../commons/uikit';
import authenticate from '../../../commons/utils/authenticate';
import UpdateUserForm from '../components/UpdateUserForm';
import * as UserServices from './services';
import s from './Users.scss';

class ListUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      openDialog: false,
      openEditDialog: false,
      selected: null,
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.comfirmDeleteUser = this.comfirmDeleteUser.bind(this);

    this.startUpload = this.startUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getUsers();
    this.uploadWidget = window.cloudinary.createUploadWidget({
      cloudName: 'izzilab', 
      uploadPreset: 'downyshoes',
      multiple: false,
    });
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
          'Đã xóa!',
          'Xóa tài khoản thành công.',
          'success',
        );
      });
    }
  }

  comfirmDeleteUser = async (index) => {
    Swal.fire({
      title: 'Bạn có chắc?',
      text: 'Bạn sẽ không thể khôi phục lại thông tin sau khi xóa!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Tiếp tục',
      cancelButtonText: 'Đóng',
    }).then((result) => {
      if (result.value) {
        this.deleteUser(index);
      }
    });
  }

  handleOpenEditDialog(user) {
    this.setState({ selected: user, openDialog: false, openEditDialog: true });
  }

  handleOpenDialog(user) {
    this.setState({ selected: user, openDialog: true, openEditDialog: false });
  }

  handleCloseDialog() {
    this.setState({ selected: null, openDialog: false });
  }

  handleCloseEditDialog() {
    this.setState({ selected: null, openEditDialog: false });
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

  startUpload = async (field) => {
    cloudinary.openUploadWidget({
      cloudName: 'izzilab', 
      uploadPreset: 'downyshoes',
    }, (error, result) => {
      if (result && result.event === "success") {
        this.setState({ [field]: result.info.url });
      }
    });
  }

  handleChange(field, value) {
    let state = this.state;
    state[field] = value;
    this.setState(Object.assign({}, state));
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const {
        email, password, fullname, dob, address, phone, gender, idNumber,
        regNumber, specialityCode, studentCode, studentClass, studentFalcuty,
        studentType, isPoorFamily, isEthnicMinority, isWoundedSoldiersKid,
        idCardFront,
        idCardBack,
        offerLetter,
        poorFamilyConfirmation,
        woundedSoldiersKidConfirmation,
        ethnicMinorityConfirmation,
      } = this.state;

      const data = {
        email, password, fullname, dob, address, phone, gender,
        identity_number: idNumber,
        identity_card_front: idCardFront,
        identity_card_back: idCardBack,
        is_old_student: studentType === 'rented-student',
        is_new_student: studentType === 'new-student',
        new_student_info: {
          registration_number: regNumber,
          speciality_code: specialityCode,
          offer_letter_image: offerLetter,
        },
        old_student_info: {
          student_code: studentCode,
          class: studentClass,
          faculty: studentFalcuty,
        },
      };

      const priorities = [];
      if (isPoorFamily) priorities.push({
        name: 'poor-family',
        image: poorFamilyConfirmation,
      })
      if (isEthnicMinority) priorities.push({
        name: 'ethnic-minority',
        image: ethnicMinorityConfirmation,
      })
      if (isWoundedSoldiersKid) priorities.push({
        name: 'wounded-soldiers-kid',
        image: woundedSoldiersKidConfirmation,
      })

      data.priorities = priorities;

      const result = await register(data);
      if(result.status === 200) {
        Swal.fire({
          title: 'Thành công!',
          text: 'Đăng ký thành công. Vui lòng chờ xét duyệt từ Quản Trị Viên',
          type: 'success',
          confirmButtonText: 'OK'
        })
        window.location.href = '/app/login';
      } else {
        Swal.fire({
          title: 'Đã xảy ra lỗi!',
          text: 'Đăng ký không thành công. Vui lòng kiểm tra thông tin và thử lại',
          type: 'error',
          confirmButtonText: 'OK'
        })
      }
    } catch (e) {
      console.log(e)
      Swal.fire({
        title: 'Đã xảy ra lỗi!',
        text: 'Đăng ký không thành công. Vui lòng kiểm tra thông tin và thử lại',
        type: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  render() {
    const {
      users, openDialog, selected,
    } = this.state;
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
        <Head>
          <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
        </Head>
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
                          <Dropdown
                            label={<i className="material-icons">more_vert</i>}
                            placement="right"
                            buttonProps={{
                              clear: true,
                            }}
                          >
                            {({ closeDropdown }) => (
                              <MenuList>
                                <MenuItem
                                  onClick={() => {
                                    this.handleOpenDialog(user);
                                    closeDropdown();
                                  }}
                                >
                                  Chi tiết
                                </MenuItem>
                                {/* <MenuItem
                                  onClick={() => {
                                    this.handleOpenEditDialog(user);
                                    closeDropdown();
                                  }}
                                >
                                  Cập nhật
                                </MenuItem> */}
                                {!is_verified ? (
                                  <MenuItem
                                    onClick={() => {
                                      this.activateUser(id);
                                      closeDropdown();
                                    }}
                                  >
                                    Duyệt
                                  </MenuItem>
                                ) : (
                                  <MenuItem
                                    danger
                                    onClick={() => {
                                      this.deactivateUser(id);
                                      closeDropdown();
                                    }}
                                  >
                                    Khóa tài khoản
                                  </MenuItem>
                                )}
                                <MenuItem
                                  danger
                                  onClick={() => {
                                    this.comfirmDeleteUser(key);
                                    closeDropdown();
                                  }}
                                >
                                  Xóa
                                </MenuItem>
                              </MenuList>
                            )}
                          </Dropdown>
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
                  {selected.priorities.length === 0 && <span>-</span>}
                  {selected.priorities.filter(item => !!item.image).length === 0 && <span>-</span>}
                  {selected.priorities.map(item => item.image && (
                    <span>
                      {item.name === 'poor-family' && <p>Giấy xác nhận hộ nghèo</p>}
                      {item.name === 'wounded-soldiers-kid' && <p>Giấy xác nhận con thương binh, liệt sỹ</p>}
                      {item.name === 'ethnic-minority' && <p>Giấy xác nhận dân tộc thiểu số</p>}
                      <img src={item.image} width="100%" />
                    </span>
                  ))}
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
